# SoTime

A modern time management web application built with Next.js, Shadcn UI, and Tailwind CSS.

## Features

- Landing page
- User authentication (sign up/login)
- Modern UI components with Shadcn
- Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
sotime/
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── lib/          # Utility functions
│   └── styles/       # Global styles
├── components.json   # Shadcn configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json     # TypeScript configuration
└── package.json      # Dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

The app uses CSS variables for theming. You can customize colors by modifying the CSS variables in `src/styles/globals.css`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

