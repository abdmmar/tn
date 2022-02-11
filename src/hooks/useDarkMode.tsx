import * as React from 'react';

import { darkTheme, lightTheme } from '@/theme';

export type Theme = 'dark' | 'light' | 'system';

export const enableTheme = (theme: 'dark' | 'light' | 'system') => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

export const disableTheme = () => {
  document.documentElement.removeAttribute('data-theme');
  localStorage.removeItem('theme');
};

/* 
  Disable theme transitions
  See: https://paco.sh/blog/disable-theme-transitions
*/
export const disableTransition = () => {
  const css = document.createElement('style');
  css.appendChild(
    document.createTextNode(
      `* {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`
    )
  );
  document.head.appendChild(css);
  return css;
};

// Calling getComputedStyle forces the browser to redraw
export const redraw = (cssElem: Element) => {
  window.getComputedStyle(cssElem).opacity;
  document.head.removeChild(cssElem);
};

export const useDarkMode = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedPreferences = localStorage.getItem('theme') != null ? (localStorage.getItem('theme') as Theme) : 'system';
  const chosenTheme = savedPreferences !== 'system' ? savedPreferences : prefersDarkMode ? 'dark' : 'light';
  const [theme, setTheme] = React.useState<Theme>(chosenTheme);

  const selectTheme = (theme: Theme) => {
    setTheme(theme);
  };

  React.useEffect(() => {
    const css = disableTransition();

    if (theme === 'system') {
      disableTheme();
      redraw(css);
      return;
    }

    enableTheme(theme);
    redraw(css);
  }, [theme]);

  return { theme: theme === 'dark' ? darkTheme : lightTheme, selectTheme };
};
