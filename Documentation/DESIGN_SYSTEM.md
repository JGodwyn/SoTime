# SoTime Design System Documentation

## 🎨 Color System

Your SoTime webapp uses a custom color palette with semantic naming and automatic theme switching.

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

## 📝 Typography System

Your typography system is based on the `StyleTokens.json` file and provides consistent text sizing across the application.

### 🎯 Display Styles (Hero Text)

- **`text-display-lg`** - 83px, 88px line-height (Main hero headlines)
- **`text-display-md`** - 67px, 72px line-height (Large hero headlines)
- **`text-display-sm`** - 53px, 56px line-height (Medium hero headlines)

### 📋 Heading Styles (Page Titles)

- **`text-heading-lg`** - 43px, 48px line-height (Page main titles)
- **`text-heading-md`** - 34px, 40px line-height (Section titles)
- **`text-heading-sm`** - 27px, 32px line-height (Subsection titles)

### 🏷️ Title Styles (Component Titles)

- **`text-title-lg`** - 22px, 28px line-height (Large component titles)
- **`text-title-md`** - 17px, 24px line-height (Medium component titles)
- **`text-title-sm`** - 14px, 20px line-height (Small component titles)

### 📖 Body Styles (Content Text)

- **`text-body-lg`** - 17px, 24px line-height (Large body text)
- **`text-body-lg-bold`** - 17px, 24px line-height, Bold weight
- **`text-body-md`** - 14px, 20px line-height (Standard body text)
- **`text-body-md-bold`** - 14px, 20px line-height, Bold weight
- **`text-body-sm`** - 9px, 12px line-height (Small body text)
- **`text-body-sm-bold`** - 9px, 12px line-height, Bold weight

### 🔘 Button Styles

- **`text-btn-lg`** - 14px, 20px line-height (Large buttons)
- **`text-btn-sm`** - 10px, 16px line-height (Small buttons)

### 🔗 Link & Utility Styles

- **`text-link`** - 14px, 20px line-height (Link text)
- **`text-sublines`** - 10px, 12px line-height (Captions, metadata)

## 🎨 Usage Examples

### Color Usage

#### Backgrounds

```tsx
// Main page background
className = 'bg-night-900';

// Card backgrounds
className = 'bg-night-800';

// Input field backgrounds
className = 'bg-night-700';

// Accent backgrounds
className = 'bg-pumpkin-100';
```

#### Text Colors

```tsx
// Primary text (white)
className = 'text-night-0';

// Secondary text
className = 'text-night-100';

// Muted text
className = 'text-night-200';

// Placeholder text
className = 'text-night-400';
```

#### Interactive Elements

```tsx
// Primary buttons
className = 'bg-pumpkin-500 hover:bg-pumpkin-600 text-night-0';

// Secondary buttons
className = 'border-dodger-400 text-dodger-400 hover:bg-dodger-400';

// Focus states
className = 'focus:ring-pumpkin-500 focus:border-pumpkin-500';
```

### Typography Usage

#### Hero Sections

```tsx
// Main headline
<h1 className="text-display-lg font-bold text-night-0">
  Welcome to SoTime
</h1>

// Large hero text
<h2 className="text-display-md text-night-100">
  Your Time Management Solution
</h2>
```

#### Page Structure

```tsx
// Page title
<h1 className="text-heading-lg font-bold text-night-0">
  Dashboard
</h1>

// Section title
<h2 className="text-heading-md text-night-100">
  Recent Activities
</h2>

// Subsection title
<h3 className="text-heading-sm text-night-200">
  This Week
</h3>
```

#### Content Hierarchy

```tsx
// Component title
<h3 className="text-title-lg font-semibold text-night-0">
  Time Tracking
</h3>

// Standard body text
<p className="text-body-md text-night-200">
  Monitor how you spend your time
</p>

// Small metadata
<span className="text-body-sm text-night-300">
  Last updated: 2 hours ago
</span>
```

#### Interactive Elements

```tsx
// Large button
<Button className="text-btn-lg bg-pumpkin-500">
  Get Started
</Button>

// Small button
<Button className="text-btn-sm bg-dodger-400">
  Learn More
</Button>

// Link text
<a className="text-link text-dodger-400 hover:text-dodger-300">
  Read more about features
</a>
```

## 🌓 Theme System

### Automatic Theme Switching

The app automatically switches between light and dark modes using CSS variables:

```css
:root {
  --background: 240 10% 4%; /* night900 - Dark theme default */
  --foreground: 0 0% 100%; /* night0 */
}

.light {
  --background: 0 0% 100%; /* night0 - Light theme */
  --foreground: 227 8% 22%; /* night500 */
}
```

### Theme Toggle

Use the `ThemeToggle` component to switch between themes:

```tsx
import { ThemeToggle } from '@/src/components/theme-toggle';

<ThemeToggle />;
```

## 🧩 Component Integration

### Shadcn Components

All Shadcn components automatically use your theme colors and typography:

```tsx
// Button with custom colors and typography
<Button className="bg-pumpkin-500 hover:bg-pumpkin-600 text-night-0 text-btn-lg">
  Primary Action
</Button>

// Card with theme colors
<Card className="bg-night-800 border-night-700">
  <CardHeader>
    <CardTitle className="text-title-lg text-night-0">Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-body-md text-night-200">Content</p>
  </CardContent>
</Card>
```

### Form Elements

Form elements automatically inherit your theme:

```tsx
// Input with theme colors and typography
<input
  className="bg-night-700 border-night-600 text-night-0 text-body-md
             focus:ring-pumpkin-500 focus:border-pumpkin-500
             placeholder-night-400"
  placeholder="Enter your email"
/>

// Label with typography
<label className="text-body-md font-medium text-night-100">
  Email Address
</label>
```

## 🔧 Customization

### Adding New Colors

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

### Adding New Typography

1. Add to `tailwind.config.js`:

```js
extend: {
  fontSize: {
    'your-style': ['16px', { lineHeight: '24px', fontFamily: 'Inter' }],
  }
}
```

2. Use in components:

```tsx
className = 'text-your-style';
```

## 📱 Responsive Design

### Typography Scaling

Your typography system works across all screen sizes:

```tsx
// Responsive typography
<h1 className="text-heading-sm md:text-heading-md lg:text-heading-lg xl:text-display-sm">
  Responsive Title
</h1>
```

### Color Consistency

Colors remain consistent across all breakpoints while maintaining accessibility.

## ✅ Best Practices

### Color Usage

- **Primary Actions**: Use Pumpkin500 for main CTAs
- **Secondary Actions**: Use Dodger400 for secondary actions
- **Backgrounds**: Use Night900 for main backgrounds, Night800 for cards
- **Text**: Use Night0 for primary text, Night100-200 for secondary text

### Typography Usage

- **Hero Text**: Use display styles for main headlines
- **Page Titles**: Use heading styles for page structure
- **Component Titles**: Use title styles for component headers
- **Body Text**: Use body styles for content
- **Buttons**: Use button styles for interactive elements

### Accessibility

- Maintain sufficient contrast ratios
- Use semantic HTML with appropriate typography
- Ensure focus states are visible
- Test with screen readers

## 🚀 Getting Started

1. **Use the color classes**: `bg-night-900`, `text-pumpkin-500`
2. **Apply typography**: `text-display-lg`, `text-body-md`
3. **Combine both**: `className="text-heading-lg text-night-0 bg-night-800"`
4. **Test themes**: Use the theme toggle to see light/dark modes
5. **Build consistently**: Follow the patterns in existing components

Your SoTime design system provides a cohesive, professional foundation for building beautiful, accessible user interfaces! 🎉

