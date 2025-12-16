"use client";

import { Text } from "@/components/ui/text";
import { richTextTheme } from "@/lib/utils/richTextTheme";
import { CodeNode } from "@lexical/code";
import { $createLinkNode, LinkNode } from "@lexical/link";
import {
  $createListItemNode,
  $createListNode,
  ListItemNode,
  ListNode,
} from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { $createHeadingNode, HeadingNode, QuoteNode } from "@lexical/rich-text";
import type { EditorState } from "lexical";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $setSelection,
} from "lexical";
import { useRef } from "react";

const getEditorConfig = () => ({
  onError(error: Error) {
    throw error;
  },
  nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, CodeNode, LinkNode],
  theme: richTextTheme,
});

interface LexicalNode {
  type: string;
  text?: string;
  children?: LexicalNode[];
  [key: string]: any;
}

const extractTextFromNode = (node: LexicalNode): string => {
  if (node.type === "text") {
    return node.text || "";
  }
  if (node.children && Array.isArray(node.children)) {
    return node.children.map((child) => extractTextFromNode(child)).join("");
  }
  return "";
};

function Placeholder({ placeholder }: { placeholder: string }) {
  return (
    <Text
      as="span"
      variant="sm"
      className="text-slate-400 truncate absolute top-4 left-4 pl-px select-none inline-block pointer-events-none"
    >
      {placeholder}
    </Text>
  );
}

const normalizeJSONForComparison = (object: any): string | null => {
  if (object === null || object === undefined) return null;
  return JSON.stringify(object, (_, value) =>
    value === undefined ? null : value
  );
};

const handleLocalChange = (
  value: EditorState,
  onChange: (json: any) => void,
  externalValue: any,
  skipNextChangeRef: React.MutableRefObject<boolean>
) => {
  if (skipNextChangeRef?.current) {
    skipNextChangeRef.current = false;
    return;
  }

  const editorStateJSON = value.toJSON();

  const externalValueNormalized = externalValue
    ? normalizeJSONForComparison(externalValue)
    : null;
  const currentValueNormalized = normalizeJSONForComparison(editorStateJSON);

  if (
    externalValueNormalized &&
    currentValueNormalized === externalValueNormalized
  ) {
    return;
  }

  onChange(editorStateJSON);
};

const reconstructNode = (nodeJSON: any): any => {
  if (!nodeJSON?.type) return null;

  switch (nodeJSON.type) {
    case "text": {
      const textNode = $createTextNode(nodeJSON.text ?? "");
      if (nodeJSON.format != null) textNode.setFormat(nodeJSON.format);
      if (nodeJSON.style) textNode.setStyle(nodeJSON.style);
      if (nodeJSON.mode === "token") textNode.setMode("token");
      else if (nodeJSON.mode === "segmented") textNode.setMode("segmented");
      return textNode;
    }

    case "paragraph": {
      const paragraph = $createParagraphNode();
      if (nodeJSON.direction) paragraph.setDirection(nodeJSON.direction);
      if (Array.isArray(nodeJSON.children)) {
        for (const child of nodeJSON.children) {
          const reconstructed = reconstructNode(child);
          if (reconstructed) paragraph.append(reconstructed);
        }
      }
      return paragraph;
    }

    case "heading": {
      if (!nodeJSON.tag) return null;
      const heading = $createHeadingNode(nodeJSON.tag);
      if (nodeJSON.direction) heading.setDirection(nodeJSON.direction);
      if (Array.isArray(nodeJSON.children)) {
        for (const child of nodeJSON.children) {
          const reconstructed = reconstructNode(child);
          if (reconstructed) heading.append(reconstructed);
        }
      }
      return heading;
    }

    case "link": {
      const link = $createLinkNode(nodeJSON.url || nodeJSON.__url || "#");
      if (nodeJSON.target) link.setTarget(nodeJSON.target);
      if (nodeJSON.title) link.setTitle(nodeJSON.title);
      if (Array.isArray(nodeJSON.children)) {
        for (const child of nodeJSON.children) {
          const reconstructed = reconstructNode(child);
          if (reconstructed) link.append(reconstructed);
        }
      }
      return link;
    }

    case "linebreak": {
      return $createTextNode("\n");
    }

    default: {
      return null;
    }
  }
};

interface ExternalValueSyncPluginProps {
  externalValue: any;
  skipNextChangeRef: React.MutableRefObject<boolean>;
}

const ExternalValueSyncPlugin = ({
  externalValue,
  skipNextChangeRef,
}: ExternalValueSyncPluginProps) => {
  const [editor] = useLexicalComposerContext();
  const previousValueRef = useRef(externalValue);
  const lastEditorValueRef = useRef<any>(null);
  const isSyncingRef = useRef(false);
  const externalValueRef = useRef(externalValue);
  const hasRegisteredListenerRef = useRef(false);
  const syncScheduledRef = useRef(false);

  const previousExternalNormalized = normalizeJSONForComparison(
    previousValueRef.current
  );
  const currentExternalNormalized = normalizeJSONForComparison(externalValue);
  const externalValueChanged =
    previousExternalNormalized !== currentExternalNormalized;

  if (externalValueChanged) {
    externalValueRef.current = externalValue;
  }

  const syncExternalValue = () => {
    if (isSyncingRef.current) return;

    const currentExternal = externalValueRef.current;

    if (!currentExternal) {
      if (previousValueRef.current !== null) {
        isSyncingRef.current = true;
        editor.update(
          () => {
            const root = $getRoot();
            root.clear();
            $setSelection(null);
          },
          { discrete: true, tag: "external-sync" }
        );

        setTimeout(() => {
          isSyncingRef.current = false;
          previousValueRef.current = null;
          lastEditorValueRef.current = null;
        }, 0);
      }
      return;
    }

    const previousNormalized = normalizeJSONForComparison(
      previousValueRef.current
    );
    const currentNormalized = normalizeJSONForComparison(currentExternal);
    const valueChanged = previousNormalized !== currentNormalized;

    if (!valueChanged) {
      previousValueRef.current = currentExternal;
      return;
    }

    let currentEditorNormalized: string | null = null;
    editor.getEditorState().read(() => {
      currentEditorNormalized = normalizeJSONForComparison(
        editor.getEditorState().toJSON()
      );
    });

    const isExternalChange =
      !currentEditorNormalized || currentNormalized !== currentEditorNormalized;

    if (isExternalChange) {
      isSyncingRef.current = true;
      skipNextChangeRef.current = true;
      previousValueRef.current = currentExternal;

      editor.update(
        () => {
          const root = $getRoot();
          root.clear();

          if (currentExternal.root?.children) {
            for (const child of currentExternal.root.children) {
              const reconstructed = reconstructNode(child);

              if (reconstructed) {
                root.append(reconstructed);
              } else if (child.type === "paragraph") {
                root.append($createParagraphNode());
              } else if (child.type === "list" && child.children) {
                const listNode = $createListNode(
                  child.listType === "number" ? "number" : "bullet"
                );

                for (const listItem of child.children) {
                  const listItemNode = $createListItemNode();
                  const paragraph = $createParagraphNode();

                  let textContent = "";
                  if (listItem?.children?.[0]?.children?.[0]) {
                    textContent = listItem.children[0].children[0].text || "";
                  } else if (listItem?.children?.[0]) {
                    textContent = extractTextFromNode(listItem.children[0]);
                  }

                  if (textContent) {
                    paragraph.append($createTextNode(textContent));
                    listItemNode.append(paragraph);
                    listNode.append(listItemNode);
                  }
                }

                if (listNode.getChildrenSize() > 0) {
                  root.append(listNode);
                }
              } else {
                root.append($createParagraphNode());
              }
            }
          }

          $setSelection(null);
        },
        { discrete: true, tag: "external-sync" }
      );

      setTimeout(() => {
        editor.getEditorState().read(() => {
          lastEditorValueRef.current = editor.getEditorState().toJSON();
        });
        isSyncingRef.current = false;
        skipNextChangeRef.current = false;
      }, 0);
    } else {
      previousValueRef.current = currentExternal;
    }
  };

  if (!hasRegisteredListenerRef.current) {
    editor.registerUpdateListener(({ editorState, tags }) => {
      if (tags.has("external-sync")) {
        lastEditorValueRef.current = editorState.toJSON();
        return;
      }
      if (
        isSyncingRef.current ||
        tags.has("history-undo") ||
        tags.has("history-redo")
      ) {
        return;
      }
      lastEditorValueRef.current = editorState.toJSON();
    });
    hasRegisteredListenerRef.current = true;
  }

  if (externalValueChanged && !syncScheduledRef.current) {
    syncScheduledRef.current = true;

    setTimeout(() => {
      syncScheduledRef.current = false;
      syncExternalValue();
    }, 0);
  }

  return null;
};

interface RichTextFieldProps {
  placeholder?: string;
  onChange: (content: any) => void;
  value?: any;
  section?: string;
  metadata?: Record<string, any>;
  currentContent?: any;
  onContentGenerated?: (content: any) => void;
}

export const RichTextField = ({
  placeholder,
  onChange,
  value,
  section,
  metadata,
  currentContent,
  onContentGenerated,
}: RichTextFieldProps) => {
  const skipNextChangeRef = useRef(false);

  return (
    <LexicalComposer
      initialConfig={{
        ...getEditorConfig(),
        editorState: value ? JSON.stringify(value) : null,
      }}
    >
      <div className="relative overflow-hidden rounded-lg">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              placeholder={<Placeholder placeholder={placeholder || ""} />}
              className="min-h-36 max-h-96 overflow-y-auto px-4 pt-4 pb-16 thin-scrollbar bg-background border border-input shadow-sm focus:outline-none focus:border-blue-500 rounded-lg *:text-base/5"
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <ExternalValueSyncPlugin
        externalValue={value}
        skipNextChangeRef={skipNextChangeRef}
      />
      <ListPlugin />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <OnChangePlugin
        onChange={(editorValue) =>
          handleLocalChange(editorValue, onChange, value, skipNextChangeRef)
        }
        ignoreSelectionChange={true}
      />
      <HistoryPlugin />
    </LexicalComposer>
  );
};
