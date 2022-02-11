import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import Home from '@/pages/Home';
import { useDarkMode } from '@/hooks/useDarkMode';

/**
 * A helper to create a Context and Provider with no upfront default value, and
 * without having to check for undefined all the time.
 */
const createCtx = <A extends Record<string, unknown> | null>() => {
  const ctx = React.createContext<A | undefined>(undefined);

  const useCtx = () => {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be used within a Provider');
    return c;
  };

  return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple not a union type
};

type AppContextType = {
  [key: string]: (value: any) => void;
};

const [useAppContext, AppProvider] = createCtx<AppContextType>();

export { useAppContext };

const App = () => {
  const { theme, selectTheme } = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      <AppProvider value={{ selectTheme }}>
        <Home />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
