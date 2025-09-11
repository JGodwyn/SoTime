# SoTime Typography System

This guide explains how to use the typography system based on your TypographyTokens.json design tokens.

## Font Families

- **Phudu**: Used for display, headings, titles, buttons, and sublines
- **Mozilla Headline**: Used for body text and links

## Typography Scale

### Display Styles (Phudu, SemiBold - 600)

Use these for hero sections, main headlines, and prominent messaging.

```tsx
<h1 className="text-display-lg">83px Display Large</h1>
<h1 className="text-display-md">67px Display Medium</h1>
<h1 className="text-display-sm">53px Display Small</h1>
```

**CSS Classes:**

- `.text-display-lg` - 83px, line-height: 88px
- `.text-display-md` - 67px, line-height: 72px
- `.text-display-sm` - 53px, line-height: 56px

### Heading Styles (Phudu, SemiBold - 600)

Use these for section headings and page titles.

```tsx
<h2 className="text-heading-lg">43px Heading Large</h2>
<h3 className="text-heading-md">34px Heading Medium</h3>
<h4 className="text-heading-sm">27px Heading Small</h4>
```

**CSS Classes:**

- `.text-heading-lg` - 43px, line-height: 48px
- `.text-heading-md` - 34px, line-height: 40px
- `.text-heading-sm` - 27px, line-height: 32px

### Title Styles (Phudu, SemiBold - 600)

Use these for card titles, form labels, and secondary headings.

```tsx
<h5 className="text-title-lg">22px Title Large</h5>
<h6 className="text-title-md">17px Title Medium</h6>
<span className="text-title-sm">14px Title Small</span>
```

**CSS Classes:**

- `.text-title-lg` - 22px, line-height: 28px
- `.text-title-md` - 17px, line-height: 24px
- `.text-title-sm` - 14px, line-height: 20px

### Body Styles (Mozilla Headline)

Use these for main content, paragraphs, and general text.

```tsx
<p className="text-body-lg">17px Body Large</p>
<p className="text-body-lg-bold">17px Body Large Bold</p>
<p className="text-body-md">14px Body Medium</p>
<p className="text-body-md-bold">14px Body Medium Bold</p>
<p className="text-body-sm">9px Body Small</p>
<p className="text-body-sm-bold">9px Body Small Bold</p>
```

**CSS Classes:**

- `.text-body-lg` - 17px, line-height: 24px, Regular (400)
- `.text-body-lg-bold` - 17px, line-height: 24px, SemiBold (600)
- `.text-body-md` - 14px, line-height: 20px, Regular (400)
- `.text-body-md-bold` - 14px, line-height: 20px, SemiBold (600)
- `.text-body-sm` - 9px, line-height: 12px, Regular (400)
- `.text-body-sm-bold` - 9px, line-height: 12px, Medium (500)

### Button Styles (Phudu, Medium - 500)

Use these for button text and call-to-action elements.

```tsx
<button className="text-btn-lg">14px Button Large</button>
<button className="text-btn-sm">10px Button Small</button>
```

**CSS Classes:**

- `.text-btn-lg` - 14px, line-height: 20px
- `.text-btn-sm` - 10px, line-height: 16px

### Link and Sublines (Mozilla Headline & Phudu)

Use these for links and supplementary text.

```tsx
<a href="#" className="text-link">14px Link Text</a>
<span className="text-sublines">10px Sublines</span>
```

**CSS Classes:**

- `.text-link` - 14px, line-height: 20px, Regular (400), Mozilla Headline
- `.text-sublines` - 10px, line-height: 12px, SemiBold (600), Phudu

## Usage Examples

### Hero Section

```tsx
<section className="hero">
  <h1 className="text-display-lg text-center">Welcome to SoTime</h1>
  <p className="text-body-lg text-center mt-6">
    Your ultimate time management solution
  </p>
</section>
```

### Card Component

```tsx
<div className="card">
  <h3 className="text-heading-md mb-4">Project Overview</h3>
  <p className="text-body-md mb-4">
    This project helps teams manage their time effectively.
  </p>
  <button className="text-btn-lg">Learn More</button>
</div>
```

### Navigation

```tsx
<nav>
  <a href="/" className="text-title-md">
    Home
  </a>
  <a href="/about" className="text-title-md">
    About
  </a>
  <a href="/contact" className="text-title-md">
    Contact
  </a>
</nav>
```

## Tailwind CSS Classes

All typography styles are also available as Tailwind CSS classes:

```tsx
// Display
text-display-lg text-display-md text-display-sm

// Headings
text-heading-lg text-heading-md text-heading-sm

// Titles
text-title-lg text-title-md text-title-sm

// Body
text-body-lg text-body-lg-bold text-body-md text-body-md-bold text-body-sm text-body-sm-bold

// Buttons
text-btn-lg text-btn-sm

// Links & Sublines
text-link text-sublines
```

## CSS Custom Properties

The typography system uses CSS custom properties for consistency:

```css
:root {
  --display-lg: 83px;
  --display-md: 67px;
  --display-sm: 53px;
  --heading-lg: 43px;
  --heading-md: 34px;
  --heading-sm: 27px;
  --title-lg: 22px;
  --title-md: 17px;
  --title-sm: 14px;
  --body-lg: 17px;
  --body-md: 14px;
  --body-sm: 9px;
  --btn-lg: 14px;
  --btn-sm: 10px;
  --link: 14px;
  --sublines: 10px;
}
```

## Best Practices

1. **Hierarchy**: Use display styles sparingly for maximum impact
2. **Consistency**: Stick to the defined scale for maintainable design
3. **Readability**: Ensure sufficient contrast between text and background
4. **Responsiveness**: Consider how typography scales on different screen sizes
5. **Accessibility**: Maintain proper heading hierarchy for screen readers

## Font Weights

- **Regular (400)**: Body text, links
- **Medium (500)**: Small body text, small buttons
- **SemiBold (600)**: Headings, titles, large body text, sublines

## Line Heights

All typography styles include optimized line heights for readability:

- Display: 1.06-1.08 ratio
- Headings: 1.12-1.18 ratio
- Titles: 1.27-1.41 ratio
- Body: 1.33-1.41 ratio
- Buttons: 1.43-1.60 ratio
- Sublines: 1.20 ratio

