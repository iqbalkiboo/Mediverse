module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '360px',

        sm: '370px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        primary: '#5600E8',
        secondary: '#DDCCFA',
        tertiary: '#D2D2D2',
        danger: '#921919',
        success: '#54AE0B',
        grayPrimary: '#B3B3B3',
        graySecondary: '#C0C0C0',
        grayTertiary: '#9E9E9E',
        grayQuaternary: '#F9F9F9',
        grayQuinary: '#F8F8F8',
        graySenary: '#F2F3F3',
        graySeptenary: '#F4F4F4',
        grayLight: '#FBFBFB',
        grayText: '#757575',
        grayBg: '#F3F3F3',
        grayDarkBg: '#E0E0E0',
        grayNeutral: '#C2C2C2',
        graySubtitle: '#ABAFB3',
        blackPrimary: '#0A0A0A',
        blackText: '#1B1B28',
        blackNeutral: '#404040',
        blueText: '#051D3B',
        greenPrimary: '#35B932',
        whitePrimary: '#F2F3F3',
        whiteSecondary: '#EEF1F4',
        whiteNeutral: '#F5F5F5',
        electricPurple: '#5600E8',
        electricPurplePressed: '#2B0074',
        electricPurpleHover: '#4800C1',
        electricPurpleHoverBorder: '#C8B7E5',
        electricPurpleSecondary: '#F8F5FF',
        reject: '#E5000C',
        rejectSecondary: '#d4000b',
        chatPrimary: '#C6C9FF',
        chatPrimary1: '#D2D4FF',
        chatSecondary: '#F5F6FF',
        baseGreen1: '#17B4A5',
      },
      boxShadow: {
        custom: '0px 0px 35px 0px rgba(0, 0, 0, 0.15)',
      },
      minWidth: {
        2: '2rem',
        4: '4rem',
        6: '6rem',
        8: '8rem',
        10: '10rem',
        12: '12rem',
        20: '20rem',
      },
      borderWidth: {
        1: '1px',
      },
      fontFamily: {
        jakarta: ['jakarta-bold'],
        'jakarta-bold': ['jakarta-bold'],
        'jakarta-medium': ['jakarta-medium'],
        'jakarta-regular': ['jakarta-regular'],
        'jakarta-light': ['jakarta-light'],
      },
      backgroundImage: {
        'coupon-lg': "url('/src/assets/images/bg-coupon-lg.webp')",
        'coupon-md': "url('/src/assets/images/bg-coupon-md.webp')",
        'coupon-sm': "url('/src/assets/images/bg-coupon-sm.webp')",
      },
      zIndex: {
        100: '100',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
