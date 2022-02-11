import * as React from 'react';
import styled from 'styled-components';
import { useAppContext } from '@/App';

const Button = styled.button`
  background-color: ${(props) => props.theme.bg.primary};
  color: ${(props) => props.theme.text.primary};
`;

const Navbar = () => {
  const { selectTheme } = useAppContext();

  return (
    <header>
      <nav>
        <Button onClick={() => selectTheme('dark')}>Dark</Button>
        <Button onClick={() => selectTheme('light')}>Light</Button>
      </nav>
    </header>
  );
};

export default Navbar;
