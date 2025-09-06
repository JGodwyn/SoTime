/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                // Shadcn semantic colors
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },

                // Custom SoTime color palette
                pumpkin: {
                    0: '#fff1eb',
                    50: '#ffe5d4',
                    100: '#ffd8ba',
                    200: '#ffb584',
                    300: '#ff9250',
                    400: '#ff7124',
                    500: '#ff5500',
                    600: '#d64700',
                    700: '#9e3500',
                    800: '#702500',
                    900: '#471800',
                    950: '#290e00',
                    1000: '#190800',
                },
                dodger: {
                    0: '#ebf7ff',
                    50: '#cbeeff',
                    100: '#a9e4ff',
                    200: '#6bcbff',
                    300: '#31b0ff',
                    400: '#0095ff',
                    500: '#0082df',
                    600: '#006cb9',
                    700: '#005490',
                    800: '#00355c',
                    900: '#001e33',
                    950: '#00111f',
                    1000: '#00070d',
                },
                night: {
                    0: '#ffffff',
                    50: '#e3e4e7',
                    100: '#c7c9d0',
                    200: '#9698a2',
                    300: '#6d6f79',
                    400: '#4c4e57',
                    500: '#33353c',
                    600: '#212228',
                    700: '#141519',
                    800: '#0e0e11',
                    900: '#0a0a0b',
                    1000: '#000000',
                },
            },
            fontSize: {
                // Display styles - Phudu font, SemiBold weight
                'display-3xl': [
                    '110px',
                    {
                        lineHeight: '118px',
                        fontFamily: 'Phudu',
                        fontWeight: '600',
                    },
                ],
                'display-2xl': [
                    '100px',
                    {
                        lineHeight: '108px',
                        fontFamily: 'Phudu',
                        fontWeight: '600',
                    },
                ],
                'display-xl': [
                    '91px',
                    {
                        lineHeight: '96px',
                        fontFamily: 'Phudu',
                        fontWeight: '600',
                    },
                ],
                'display-lg': [
                    '83px',
                    {
                        lineHeight: '88px',
                        fontFamily: 'Phudu',
                        fontWeight: '600',
                    },
                ],
                'display-md': [
                    '67px',
                    {
                        lineHeight: '72px',
                        fontFamily: 'Phudu',
                        fontWeight: '600',
                    },
                ],
                'display-sm': [
                    '53px',
                    {
                        lineHeight: '56px',
                        fontFamily: 'Phudu',
                        fontWeight: '600',
                    },
                ],

                // Heading styles - Phudu font, SemiBold weight
                'heading-lg': [
                    '43px',
                    {
                        lineHeight: '48px',
                        fontFamily: 'Phudu',
                        fontWeight: '600',
                    },
                ],
                'heading-md': [
                    '34px',
                    {
                        lineHeight: '40px',
                        fontFamily: 'Phudu',
                        fontWeight: '600',
                    },
                ],
                'heading-sm': [
                    '27px',
                    {
                        lineHeight: '32px',
                        fontFamily: 'Phudu',
                        fontWeight: '600',
                    },
                ],

                // Title styles - Phudu font, SemiBold weight
                'title-lg': [
                    '22px',
                    {
                        lineHeight: '28px',
                        fontFamily: 'Phudu',
                        fontWeight: '600',
                    },
                ],
                'title-md': [
                    '17px',
                    {
                        lineHeight: '24px',
                        fontFamily: 'Phudu',
                        fontWeight: '600',
                    },
                ],
                'title-sm': [
                    '14px',
                    {
                        lineHeight: '20px',
                        fontFamily: 'Phudu',
                        fontWeight: '600',
                    },
                ],

                // Body styles - Mozilla Headline font
                'body-lg': [
                    '17px',
                    {
                        lineHeight: '24px',
                        fontFamily: 'Mozilla Headline',
                        fontWeight: '400',
                    },
                ],
                'body-lg-bold': [
                    '17px',
                    {
                        lineHeight: '24px',
                        fontFamily: 'Mozilla Headline',
                        fontWeight: '600',
                    },
                ],
                'body-md': [
                    '14px',
                    {
                        lineHeight: '20px',
                        fontFamily: 'Mozilla Headline',
                        fontWeight: '400',
                    },
                ],
                'body-md-bold': [
                    '14px',
                    {
                        lineHeight: '20px',
                        fontFamily: 'Mozilla Headline',
                        fontWeight: '600',
                    },
                ],
                'body-sm': [
                    '9px',
                    {
                        lineHeight: '12px',
                        fontFamily: 'Mozilla Headline',
                        fontWeight: '400',
                    },
                ],
                'body-sm-bold': [
                    '9px',
                    {
                        lineHeight: '12px',
                        fontFamily: 'Mozilla Headline',
                        fontWeight: '500',
                    },
                ],

                // Button styles - Phudu font, Medium weight
                'btn-lg': [
                    '14px',
                    {
                        lineHeight: '20px',
                        fontFamily: 'Phudu',
                        fontWeight: '500',
                    },
                ],
                'btn-sm': [
                    '10px',
                    {
                        lineHeight: '16px',
                        fontFamily: 'Phudu',
                        fontWeight: '500',
                    },
                ],

                // Link and subline styles
                link: [
                    '14px',
                    {
                        lineHeight: '20px',
                        fontFamily: 'Mozilla Headline',
                        fontWeight: '400',
                    },
                ],
                sublines: [
                    '10px',
                    {
                        lineHeight: '12px',
                        fontFamily: 'Phudu',
                        fontWeight: '600',
                    },
                ],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0',
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: '0',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};