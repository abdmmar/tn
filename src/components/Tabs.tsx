import * as React from 'react';
import styled from 'styled-components';

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
interface TabProps {
  active: boolean;
}

const Tab = styled.button<TabProps>`
  font-weight: ${(props) => (props.active ? 500 : 400)};
  text-align: center;
  color: ${(props) => (props.active ? 'hsla(0, 0%, 100%, 1)' : 'hsla(0, 0%, 75%, 1)')};
  background-color: ${(props) => (props.active ? 'hsla(225, 15%, 17%, 1)' : 'hsla(0, 0%, 100%, 1)')};
  border: 0;
  border-radius: 6px;
  padding: 5px 15px;
  width: fit-content;
  cursor: pointer;
`;

interface TabsProps {
  items: string[];
  current: string;
  set: (region: string) => void;
  children?: React.ReactNode;
}

const Tabs = ({ items, current, set }: TabsProps) => {
  return (
    <TabsContainer>
      {items.map((key: string) => {
        return (
          <Tab
            key={key}
            active={current === key}
            onClick={() => {
              set(key);
            }}
          >
            {key}
          </Tab>
        );
      })}
    </TabsContainer>
  );
};

export default React.memo(Tabs);
