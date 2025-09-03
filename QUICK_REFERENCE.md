# SoTime Design System - Quick Reference

## 🎨 Color Classes

### Backgrounds

```tsx
bg - night - 900; // Main background (dark theme)
bg - night - 800; // Card/navigation backgrounds
bg - night - 700; // Input field backgrounds
bg - night - 600; // Border backgrounds
bg - pumpkin - 500; // Primary button backgrounds
bg - dodger - 400; // Secondary button backgrounds
```

### Text Colors

```tsx
text - night - 0; // White text (primary)
text - night - 100; // Light text
text - night - 200; // Muted text
text - night - 300; // Secondary text
text - night - 400; // Placeholder text
text - pumpkin - 500; // Primary accent text
text - dodger - 400; // Secondary accent text
```

### Borders & Focus

```tsx
border - night - 700; // Card borders
border - night - 600; // Input borders
border - pumpkin - 500; // Primary focus borders
border - dodger - 400; // Secondary borders
focus: ring - pumpkin - 500; // Primary focus rings
focus: border - pumpkin - 500; // Primary focus borders
```

## 📝 Typography Classes

### Hero Text

```tsx
text - display - lg; // 83px - Main headlines
text - display - md; // 67px - Large headlines
text - display - sm; // 53px - Medium headlines
```

### Page Structure

```tsx
text - heading - lg; // 43px - Page titles
text - heading - md; // 34px - Section titles
text - heading - sm; // 27px - Subsection titles
```

### Component Titles

```tsx
text - title - lg; // 22px - Large component titles
text - title - md; // 17px - Medium component titles
text - title - sm; // 14px - Small component titles
```

### Content Text

```tsx
text - body - lg; // 17px - Large body text
text - body - lg - bold; // 17px - Large bold body text
text - body - md; // 14px - Standard body text
text - body - md - bold; // 14px - Bold body text
text - body - sm; // 9px - Small body text
text - body - sm - bold; // 9px - Small bold body text
```

### Interactive Elements

```tsx
text - btn - lg; // 14px - Large buttons
text - btn - sm; // 10px - Small buttons
text - link; // 14px - Links
text - sublines; // 10px - Captions, metadata
```

## 🔧 Common Patterns

### Primary Button

```tsx
<Button className="bg-pumpkin-500 hover:bg-pumpkin-600 text-night-0 text-btn-lg">
  Primary Action
</Button>
```

### Secondary Button

```tsx
<Button
  variant="outline"
  className="border-dodger-400 text-dodger-400 hover:bg-dodger-400 hover:text-night-0 text-btn-lg"
>
  Secondary Action
</Button>
```

### Card Layout

```tsx
<div className="bg-night-800 border border-night-700 rounded-lg p-6">
  <h3 className="text-title-lg font-semibold text-night-0 mb-2">Title</h3>
  <p className="text-body-md text-night-200">Content</p>
</div>
```

### Form Input

```tsx
<input
  className="bg-night-700 border border-night-600 text-night-0 text-body-md
             focus:ring-2 focus:ring-pumpkin-500 focus:border-pumpkin-500
             placeholder-night-400 rounded-md px-3 py-2"
  placeholder="Enter text..."
/>
```

### Navigation Link

```tsx
<Link className="text-body-md text-night-200 hover:text-night-0 transition-colors">
  Navigation Item
</Link>
```

### Hero Section

```tsx
<div className="text-center space-y-6">
  <h1 className="text-display-lg font-bold text-night-0">Main Headline</h1>
  <p className="text-body-lg text-night-100 max-w-2xl">
    Supporting text description
  </p>
  <Button className="bg-pumpkin-500 hover:bg-pumpkin-600 text-night-0 text-btn-lg">
    Call to Action
  </Button>
</div>
```

## 🌓 Theme Classes

### Dark Theme (Default)

```tsx
// Automatically applied - no classes needed
bg - night - 900; // Background
text - night - 0; // Text
```

### Light Theme

```tsx
// Applied when .light class is active
bg - night - 0; // Background
text - night - 500; // Text
```

## 📱 Responsive Examples

### Typography Scaling

```tsx
<h1 className="text-heading-sm md:text-heading-md lg:text-heading-lg xl:text-display-sm">
  Responsive Title
</h1>
```

### Layout Adjustments

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  {/* Responsive grid */}
</div>
```

## 🎯 Quick Start

1. **Background**: `bg-night-900` for main, `bg-night-800` for cards
2. **Text**: `text-night-0` for primary, `text-night-200` for secondary
3. **Typography**: `text-display-lg` for heroes, `text-body-md` for content
4. **Buttons**: `bg-pumpkin-500` for primary, `border-dodger-400` for secondary
5. **Focus**: `focus:ring-pumpkin-500` for all interactive elements

## 🔍 Finding Classes

- **Colors**: Look for `night-`, `pumpkin-`, `dodger-` prefixes
- **Typography**: Look for `text-` prefix with descriptive names
- **States**: Use `hover:`, `focus:`, `active:` prefixes
- **Responsive**: Use `sm:`, `md:`, `lg:`, `xl:` breakpoint prefixes

This quick reference covers 90% of your daily design system needs! 🚀

