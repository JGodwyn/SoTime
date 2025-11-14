# Overlay System - Scalable Architecture

## 📁 Recommended Structure

Keep overlay content as **separate component files** in the `overlay/` directory. This approach provides:

✅ **Separation of Concerns** - Each overlay is self-contained  
✅ **Reusability** - Content components can be used anywhere  
✅ **Maintainability** - Easy to find and update specific overlays  
✅ **Scalability** - Add new overlays without touching existing code  

## 📂 File Organization

```
src/components/overlay/
├── overlay-provider.tsx          # Core overlay system (don't modify)
├── connect-account-overlay-content.tsx  # Connect Account overlay
├── settings-overlay-content.tsx         # Example: Settings overlay
├── confirmation-overlay-content.tsx    # Example: Confirmation dialogs
└── README.md                      # This file
```

## 🚀 Usage Pattern

### 1. Create a New Overlay Content Component

```tsx
// src/components/overlay/my-overlay-content.tsx
'use client'

import { Button } from "@/src/components/ui/button"
import { useOverlay } from "@/src/components/overlay/overlay-provider"

export function MyOverlayContent() {
  const { closeOverlay } = useOverlay()

  return (
    <div>
      {/* Your overlay content */}
      <Button onClick={closeOverlay}>Close</Button>
    </div>
  )
}
```

### 2. Register It on a Page

```tsx
// src/app/my-page.tsx
'use client'

import { useEffect } from "react"
import { useOverlay } from "@/src/components/overlay/overlay-provider"
import { MyOverlayContent } from "@/src/components/overlay/my-overlay-content"

export default function MyPage() {
  const { registerOverlayContent } = useOverlay()

  useEffect(() => {
    const unregister = registerOverlayContent({
      content: <MyOverlayContent />,
    })
    return unregister
  }, [registerOverlayContent])

  return <div>My Page</div>
}
```

### 3. Open It from Anywhere

```tsx
// Any component
import { useOverlay } from "@/src/components/overlay/overlay-provider"

function MyComponent() {
  const { openOverlay } = useOverlay()

  return (
    <button onClick={() => openOverlay()}>
      Open Overlay
    </button>
  )
}
```

## 🎨 Customization Options

When registering overlay content, you can customize:

```tsx
registerOverlayContent({
  content: <MyOverlayContent />,
  panelClassName: "max-w-2xl",           // Custom panel width
  backdropClassName: "bg-black/90",       // Custom backdrop
  closeOnBackdrop: true,                  // Close on backdrop click
  closeOnEscape: true,                    // Close on ESC key
})
```

## 💡 Best Practices

1. **One overlay per page** - Register content in the page component
2. **Self-contained components** - Each overlay handles its own logic
3. **Use the hook** - Always use `useOverlay()` to access `closeOverlay()`
4. **Consistent styling** - Use your design system tokens (night, pumpkin, dodger)
5. **Accessibility** - The overlay system handles ESC key and focus management

## 🔄 Alternative: Dynamic Content

You can also pass content directly when opening:

```tsx
const { openOverlay } = useOverlay()

openOverlay({
  content: <div>Custom content here</div>,
  panelClassName: "max-w-md",
})
```

This is useful for simple, one-off overlays that don't need a dedicated component.

