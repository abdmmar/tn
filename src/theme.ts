const defaultTheme = {
  spacing: {
    xxs: '4px',
    xs: '8px',
    s: '12px',
    m: '16px',
    ml: '20px',
    l: '24px',
    xl: '32px',
    xxl: '40px',
    xxxl: '48px',
    xxxxl: '56px'
  },
  color: {
    gray: {
      100: 'hsla(240, 9%, 98%, 1)',
      200: 'hsla(240, 9%, 88%, 1)',
      300: 'hsla(240, 9%, 78%, 1)',
      400: 'hsla(240, 9%, 68%, 1)',
      500: 'hsla(240, 9%, 58%, 1)',
      600: 'hsla(240, 9%, 48%, 1)',
      700: 'hsla(240, 9%, 38%, 1)',
      800: 'hsla(240, 9%, 28%, 1)',
      900: 'hsla(240, 9%, 18%, 1)'
    },
    black: 'hsla(240, 9%, 11%, 1)',
    white: 'hsla(0, 0%, 100%, 1)'
  }
};

const light = {
  bg: {
    primary: defaultTheme.color.white,
    secondary: defaultTheme.color.gray[100],
    hover: 'hsla(240, 8%, 95%, 1)'
  },
  text: {
    primary: 'hsla(225, 15%, 17%, 1)',
    secondary: 'hsla(225, 15%, 47%, 1)',
    ternary: 'rgb(218, 218, 218)'
  }
};

const dark = {
  bg: {
    primary: defaultTheme.color.black,
    secondary: defaultTheme.color.gray[900],
    hover: defaultTheme.color.gray[800]
  },
  text: {
    primary: defaultTheme.color.gray[200],
    secondary: defaultTheme.color.gray[400],
    ternary: defaultTheme.color.gray[800]
  }
};

export const lightTheme = { ...defaultTheme, ...light };
export const darkTheme = { ...defaultTheme, ...dark };
