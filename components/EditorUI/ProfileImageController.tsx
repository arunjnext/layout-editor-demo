"use client";

import { Image as ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface ProfileImageProps {
  profileImageUrl?: string | null;
  onChange: (file: File | null) => void;
  onRemove: () => void;
}

const ProfileImage = ({
  profileImageUrl,
  onChange,
  onRemove,
}: ProfileImageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(
    profileImageUrl || null
  );
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setIsLoading(true);
      try {
        const objectUrl = URL.createObjectURL(file);
        setProfileImage(objectUrl);
        onChange(file); // Pass file to parent
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading image:", error);
        setIsLoading(false);
      }
    }
  };

  const handleRemove = () => {
    setProfileImage(null);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
    onRemove();
  };

  return (
    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border bg-background-alt">
      {profileImage ? (
        <>
          <Image
            src={profileImage}
            alt="Profile"
            fill
            className="object-cover"
            unoptimized
          />
          {!isLoading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-0 right-0 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
            >
              <X size={12} />
            </button>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="w-full h-full flex items-center justify-center hover:bg-background-alt transition-colors"
        >
          {isLoading ? (
            <Loader2 className="animate-spin text-muted-foreground" size={24} />
          ) : (
            <ImageIcon className="text-muted-foreground" size={24} />
          )}
        </button>
      )}
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

interface ProfileImageControllerProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  profileImageUrl?: string | null;
  onImageChange?: (file: File | null) => void;
}

export const ProfileImageController = <T extends FieldValues = FieldValues>({
  name,
  control,
  profileImageUrl,
  onImageChange,
}: ProfileImageControllerProps<T>) => {
  const {
    field: { onChange },
  } = useController({
    name,
    control,
  });

  const handleImageChange = (file: File | null) => {
    onChange(file);
    if (onImageChange) {
      onImageChange(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (onImageChange) {
      onImageChange(null);
    }
  };

  return (
    <ProfileImage
      profileImageUrl={profileImageUrl}
      onChange={handleImageChange}
      onRemove={handleRemove}
    />
  );
};
