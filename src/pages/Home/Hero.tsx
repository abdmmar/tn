import * as React from 'react';
import styled from 'styled-components';

import { heroImage, HeroImageType } from './Hero.util';

interface HeroImageStyle {
  src?: string;
}

const HeroImage = styled.div<HeroImageStyle>`
  height: 100vh;
  width: 100%;
  background-color: hsla(225, 15%, 17%, 1);
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.src});
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 50px 100px;
`;

const HeroWrapper = styled.div`
  display: flex;
  height: 75%;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-start;
`;

const HeroContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-end;
  align-items: flex-end;
  gap: 20px;
`;

const HeroContent = styled.div`
  display: grid;
  gap: 1rem;
  width: fit-content;
  height: fit-content;
  position: fixed;
`;

const HeroTitle = styled.h1`
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: -0.025em;
  text-align: left;
  color: hsla(0, 0%, 100%, 1);
`;

const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  color: hsla(0, 0%, 100%, 1);
`;

const HeroLink = styled.a`
  font-weight: 600;
  text-align: center;
  color: hsla(0, 0%, 0%, 1);
  background-color: hsla(0, 0%, 100%, 1);
  border-radius: 6px;
  padding: 10px 20px;
  width: fit-content;
  text-decoration: none;
  transition: box-shadow 150ms;

  &:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
  }
`;

const HeroInfo = styled.p`
  position: fixed;
  right: 100px;
  font-size: 0.75rem;
  color: hsla(0, 0%, 100%, 1);
  text-decoration: none;
`;

const HeroInfoLink = styled.a`
  text-decoration: none;
  color: hsla(0, 0%, 100%, 1);
`;

const getRandomHero = (heroImage: HeroImageType[]) => {
  const randomNumber = Math.random() * 10;
  const randomIndex = Math.floor(randomNumber > heroImage.length - 1 ? 0 : randomNumber);
  return heroImage[randomIndex];
};

const Hero = () => {
  const randomHero = getRandomHero(heroImage);

  return (
    <HeroImage src={randomHero.filename}>
      <HeroWrapper>
        <HeroContainer>
          <HeroContent>
            <HeroTitle>
              Indonesia <br /> National Parks
            </HeroTitle>
            <HeroSubtitle>Unofficial GraphQL API for Indonesia National Park</HeroSubtitle>
            <HeroLink href="https://tn-ql.abdmmar.com" target="_blank">
              Try it now!
            </HeroLink>
          </HeroContent>
          <HeroInfo>
            {`${randomHero.location}, ${randomHero.nationalPark} by `}
            <HeroInfoLink href={randomHero.author.link}>{randomHero.author.name}</HeroInfoLink>
          </HeroInfo>
        </HeroContainer>
      </HeroWrapper>
    </HeroImage>
  );
};

export default Hero;
