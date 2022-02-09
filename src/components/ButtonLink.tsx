import * as React from 'react';
import styled from 'styled-components';

interface LinkProps {
  secondary?: boolean;
}

const Link = styled.a<LinkProps>`
  font-weight: 600;
  text-align: center;
  color: ${(props) => (props.secondary ? 'hsla(0, 0%, 100%, 1)' : 'hsla(0, 0%, 0%, 1)')};
  background-color: ${(props) => (props.secondary ? 'hsla(0, 0%, 100%, 0.1)' : 'hsla(0, 0%, 100%, 1)')};
  border: ${(props) => (props.secondary ? '1px solid hsla(0, 0%, 100%, 1)' : '0')};
  border-radius: 6px;
  padding: 10px 20px;
  width: fit-content;
  text-decoration: none;
  transition: box-shadow 150ms;

  &:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
  }
`;

interface ButtonLinkProps {
  href: string;
  target?: string;
  secondary?: boolean;
  children?: React.ReactNode;
}

const ButtonLink = ({ children, href, target, ...rest }: ButtonLinkProps) => {
  return (
    <Link href={href} target={target} {...rest}>
      {children}
    </Link>
  );
};

export default ButtonLink;
