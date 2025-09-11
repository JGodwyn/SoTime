# SoTime Theme System Documentation

## 🎨 Custom Color Palette

Your SoTime webapp now uses a custom color system based on your `SoTimeVariables.json` file:

### 🌙 Night Colors (Grays/Blacks)

- **Night900** (`#0a0a0b`) - **Primary Background** (Dark theme)
- **Night800** (`#0e0e11`) - Navigation & Card backgrounds
- **Night700** (`#141519`) - Input fields & borders
- **Night600** (`#212228`) - Secondary borders
- **Night500** (`#33353c`) - Muted backgrounds
- **Night400** (`#4c4e57`) - Text placeholders
- **Night300** (`#6d6f79`) - Secondary text
- **Night200** (`#9698a2`) - Muted text
- **Night100** (`#c7c9d0`) - Light text
- **Night50** (`#e3e4e7`) - Very light text
- **Night0** (`#ffffff`) - Pure white text

### 🎃 Pumpkin Colors (Oranges)

- **Pumpkin500** (`#ff5500`) - **Primary Actions** (Buttons, Links)
- **Pumpkin600** (`#d64700`) - Primary hover states
- **Pumpkin400** (`#ff7124`) - Primary light variants
- **Pumpkin300** (`#ff9250`) - Primary lighter variants
- **Pumpkin200** (`#ffb584`) - Background accents
- **Pumpkin100** (`#ffd8ba`) - Light backgrounds
- **Pumpkin50** (`#ffe5d4`) - Very light backgrounds
- **Pumpkin0** (`#fff1eb`) - Subtle backgrounds

### 🔵 Dodger Colors (Blues)

- **Dodger400** (`#0095ff`) - **Secondary Actions** (Outline buttons, Links)
- **Dodger500** (`#0082df`) - Secondary hover states
- **Dodger300** (`#31b0ff`) - Secondary light variants
- **Dodger200** (`#6bcbff`) - Secondary lighter variants
- **Dodger100** (`#a9e4ff`) - Background accents
- **Dodger50** (`#cbeeff`) - Light backgrounds
- **Dodger0** (`#ebf7ff`) - Very light backgrounds

## 🎯 Theme Implementation

### CSS Variables

The theme system uses CSS custom properties that automatically adapt to light/dark modes:

```css
:root {
  --background: 240 10% 4%; /* night900 */
  --foreground: 0 0% 100%; /* night0 */
  --primary: 20 100% 50%; /* pumpkin500 */
  --secondary: 205 100% 50%; /* dodger400 */
  /* ... more variables */
}
```

### Tailwind Classes

Your custom colors are available as Tailwind classes:

```tsx
// Backgrounds
className = 'bg-night-900'; // Main background
className = 'bg-night-800'; // Card backgrounds
className = 'bg-night-700'; // Input backgrounds

// Text colors
className = 'text-night-0'; // White text
className = 'text-night-100'; // Light text
className = 'text-night-200'; // Muted text

// Primary actions
className = 'bg-pumpkin-500'; // Primary buttons
className = 'hover:bg-pumpkin-600'; // Hover states

// Secondary actions
className = 'border-dodger-400'; // Outline buttons
className = 'text-dodger-400'; // Secondary text
```

## 🌓 Theme Toggle

The app includes a theme toggle component that switches between:

- **Dark Mode (Default)**: Uses Night900 background
- **Light Mode**: Uses Night0 background with inverted text colors

### Usage

```tsx
import { ThemeToggle } from '@/src/components/theme-toggle';

// Add to your navigation or layout
<ThemeToggle />;
```

## 🧩 Shadcn Integration

All Shadcn components automatically use your custom theme:

### Button Variants

```tsx
// Primary button (Pumpkin)
<Button className="bg-pumpkin-500 hover:bg-pumpkin-600 text-night-0">
  Get Started
</Button>

// Secondary button (Dodger)
<Button variant="outline" className="border-dodger-400 text-dodger-400">
  Learn More
</Button>
```

### Form Elements

```tsx
// Input fields automatically use Night colors
<input className="bg-night-700 border-night-600 text-night-0" />

// Focus states use Pumpkin
<input className="focus:ring-pumpkin-500 focus:border-pumpkin-500" />
```

## 📱 Component Examples

### Navigation Bar

```tsx
<nav className="bg-night-800/80 border-b border-night-700">
  <div className="text-night-0">SoTime</div>
  <div className="text-night-200 hover:text-night-0">Home</div>
</nav>
```

### Cards

```tsx
<div className="bg-night-800 border border-night-700 rounded-lg">
  <h3 className="text-night-0">Title</h3>
  <p className="text-night-200">Description</p>
</div>
```

### Buttons

```tsx
// Primary action
<Button className="bg-pumpkin-500 hover:bg-pumpkin-600 text-night-0">
  Primary Action
</Button>

// Secondary action
<Button variant="outline" className="border-dodger-400 text-dodger-400">
  Secondary Action
</Button>
```

## 🎨 Color Usage Guidelines

### Primary Actions (Pumpkin)

- Main call-to-action buttons
- Important links
- Success states
- Brand elements

### Secondary Actions (Dodger)

- Outline buttons
- Secondary links
- Information states
- Navigation elements

### Backgrounds (Night)

- **Night900**: Main page backgrounds
- **Night800**: Card and navigation backgrounds
- **Night700**: Input field backgrounds
- **Night600**: Border colors

### Text (Night)

- **Night0**: Primary text (white)
- **Night100**: Secondary text
- **Night200**: Muted text
- **Night300**: Placeholder text

## 🔧 Customization

### Adding New Colors

To add new colors to your palette:

1. Add to `tailwind.config.js`:

```js
extend: {
  colors: {
    yourColor: {
      500: "#your-hex",
      // ... more shades
    }
  }
}
```

2. Add CSS variables in `globals.css`:

```css
:root {
  --your-color: 0 0% 50%; /* HSL values */
}
```

### Modifying Existing Colors

Update the hex values in `tailwind.config.js` and the corresponding HSL values in `globals.css`.

## ✅ Current Status

Your theme system is fully implemented with:

- ✅ Custom color palette (Pumpkin, Dodger, Night)
- ✅ Dark mode by default (Night900 background)
- ✅ Light mode toggle functionality
- ✅ Shadcn component integration
- ✅ Responsive design support
- ✅ CSS variable system
- ✅ Tailwind class availability

## 🚀 Next Steps

1. **Test the theme toggle** - Click the sun/moon icon in navigation
2. **Customize component colors** - Use your palette in new components
3. **Add more color variants** - Extend the palette as needed
4. **Create color documentation** - Document your design system

Your SoTime webapp now has a professional, cohesive theme system that perfectly matches your brand colors! 🎉

