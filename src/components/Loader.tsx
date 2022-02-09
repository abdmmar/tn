import * as React from 'react';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

interface SpinnerProps {
  width?: string;
  height?: string;
  strokeWidth?: string;
}

const Spinner = styled.div<SpinnerProps>`
  display: inline-block;
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin: 10px;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border: ${(props) => props.strokeWidth}px solid hsla(225, 15%, 17%, 1);
    border-radius: 50%;
    animation: ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: hsla(225, 15%, 17%, 1) transparent transparent transparent;
  }

  & div:nth-child(1) {
    animation-delay: -0.45s;
  }

  & div:nth-child(2) {
    animation-delay: -0.3s;
  }

  & div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface LoaderProps {
  width?: string;
  height?: string;
  strokeWidth?: string;
}

const Loader = ({ width = '32', height = '32', strokeWidth = '4' }: LoaderProps) => {
  return (
    <SpinnerWrapper>
      <Spinner width={width} height={height} strokeWidth={strokeWidth}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Spinner>
    </SpinnerWrapper>
  );
};

export default Loader;
