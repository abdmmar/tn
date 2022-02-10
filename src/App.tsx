import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import Home from '@/pages/Home';
import { AppProvider } from '@/components/Provider';
import { useDarkMode } from '@/hooks/useDarkMode';

const App = () => {
  const { theme, setTheme } = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      <AppProvider value={{ setTheme }}>
        <Home />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
