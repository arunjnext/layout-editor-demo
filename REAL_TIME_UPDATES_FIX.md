# Real-Time Updates Fix for Resume Preview

## Problem

The preview panel was not updating the page count and remaining space in real-time when experiences were added or modified.

## Root Cause

The hook was only calling `getPageCount()` and `getRemainingSpace()` once when the engine was first initialized, not after each content addition.

## Solution Implemented

### 1. Enhanced `useResumeLayout` Hook

**Key Changes:**

- Added `updateStats()` callback that updates page count and remaining space
- Exported `updateStats` so components can call it after content changes
- Used `useCallback` to memoize the updateStats function
- Initial stats are set immediately after engine initialization

```typescript
// Function to update stats after any layout change
const updateStats = useCallback(() => {
  if (engineRef.current) {
    setPageCount(engineRef.current.getPageCount());
    setRemainingSpace(engineRef.current.getRemainingSpace());
  }
}, []);

return {
  containerRef,
  engine,
  pageCount,
  remainingSpace,
  updateStats, // Now exported!
};
```

### 2. Updated `ResumePreview` Component

**Key Changes:**

- Call `updateStats()` after engine reset
- Call `updateStats()` after each experience is added
- This ensures real-time updates as content is rendered

```typescript
const { containerRef, engine, pageCount, remainingSpace, updateStats } = useResumeLayout({...});

useEffect(() => {
  if (!engine) return;

  (async () => {
    // Reset and update stats
    engine.reset();
    updateStats();

    // Add each experience
    for (const exp of resume.experience || []) {
      await engine.addExperience({...});

      // Update stats after each addition ⭐
      updateStats();
    }
  })();
}, [engine, resume.experience, updateStats]);
```

## How It Works Now

```
User adds experience
    ↓
Form updates (via react-hook-form)
    ↓
Resume context updates (debounced 500ms)
    ↓
ResumePreview effect triggers
    ↓
Engine resets all content
    ↓
updateStats() → Stats bar shows "Pages: 0"
    ↓
For each experience:
  ↓
  engine.addExperience() → Content rendered
  ↓
  updateStats() → Stats bar updates "Pages: 1, Remaining: 800px"
  ↓
  (next experience...)
  ↓
  engine.addExperience() → Content rendered
  ↓
  updateStats() → Stats bar updates "Pages: 1, Remaining: 400px"
  ↓
  (If content doesn't fit, engine creates new page)
  ↓
  engine.addExperience() → Content rendered on page 2
  ↓
  updateStats() → Stats bar updates "Pages: 2, Remaining: 900px"
```

## Testing Instructions

1. **Open the app** at http://localhost:3000
2. **Navigate to Experience** section
3. **Add first experience:**
   - Fill in job title, company, dates, description
   - Watch stats bar update: "Pages: 1, Remaining: XXXpx"
4. **Add second experience:**
   - Stats bar should update again with new remaining space
5. **Add multiple experiences:**
   - When content exceeds one page, stats should show "Pages: 2"
   - Remaining space should reset to ~900-1000px (new page space)
6. **Edit an experience:**
   - Change description to be longer
   - Stats should update to reflect new space usage

## Benefits

✅ **Real-time feedback** - See page count and space as you type
✅ **Accurate calculations** - Stats update after every content change
✅ **Performance** - Updates only happen after debounced form changes
✅ **User experience** - Know when you're running out of space on a page

## API Methods Used

From the `ResumeLayoutEngine` class:

```typescript
// Layout methods
await engine.addExperience(position: Position): Promise<PlacementResult>
engine.reset(): void

// Query methods
engine.getPageCount(): number
engine.getRemainingSpace(): number
engine.getCurrentPageIndex(): number
engine.getSpaceBreakdown(): SpaceBreakdown | null

// Lifecycle
engine.destroy(): void
```

## Implementation Pattern

This pattern can be reused for other sections (Education, Skills, etc.):

```typescript
// 1. Get updateStats from hook
const { engine, updateStats } = useResumeLayout({...});

// 2. Call updateStats after reset
engine.reset();
updateStats();

// 3. Call updateStats after each add
await engine.addEducation(edu);
updateStats();

await engine.addSkills(skills);
updateStats();
```

## Performance Considerations

- Updates are batched by React's state updates
- No unnecessary re-renders due to `useCallback` memoization
- Stats only update when content changes (via useEffect dependencies)
- Debouncing (500ms) prevents excessive updates during typing

## Future Enhancements

- Add color coding for remaining space (red < 100px, orange < 300px, green > 300px)
- Show warning when approaching page limit
- Add visual page break indicators
- Show which page each experience is on
- Add "page full" warnings before adding more content
