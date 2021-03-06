import * as React from 'react';
import styled from 'styled-components';

import { devices } from '@/styles';
import { heroImage, HeroImageType } from './Hero.util';
import ButtonLink from '@/components/ButtonLink';

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

  @media ${devices.mobile} {
    padding: 20px;
  }
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

  @media ${devices.mobile} {
    flex-direction: column;
    align-items: start;
  }
`;

const HeroContent = styled.div`
  display: grid;
  gap: 1rem;
  width: fit-content;
  height: fit-content;
  position: fixed;

  @media ${devices.mobile} {
    position: initial;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: -0.025em;
  text-align: left;
  color: hsla(0, 0%, 100%, 1);

  @media ${devices.mobile} {
    font-size: 2.5rem;
    line-height: 40px;
    letter-spacing: 0;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  color: hsla(0, 0%, 100%, 1);

  @media ${devices.mobile} {
    font-size: 1rem;
  }
`;

const HeroInfo = styled.p`
  position: fixed;
  right: 100px;
  font-size: 0.75rem;
  color: hsla(0, 0%, 100%, 1);
  text-decoration: none;

  @media ${devices.mobile} {
    position: initial;
    right: none;
  }
`;

const HeroInfoLink = styled.a`
  text-decoration: none;
  color: hsla(0, 0%, 100%, 1);
`;

const ButtonsLink = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  align-items: center;
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
            <ButtonsLink>
              <ButtonLink href="https://tn-ql.abdmmar.com" target="_blank">
                Try it now!
              </ButtonLink>
              <ButtonLink href="https://github.com/abdmmar/tn-ql" target="_blank" secondary>
                Github
              </ButtonLink>
            </ButtonsLink>
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
