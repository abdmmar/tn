import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: 1px solid hsla(0, 0%, 95%, 1);
  background-color: white;
  padding: 15px;
  gap: 10px;
  height: fit-content;
  transition: box-shadow 150ms;

  &:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 6px;
  background-color: hsla(225, 15%, 17%, 1);
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

type StatusProps = {
  bgColor?: string;
};

const Status = styled.div<StatusProps>`
  border-radius: 50px;
  padding: 3px 10px;
  font-size: 12px;
  color: white;
  background-color: ${(props) => props.bgColor};
  width: fit-content;
`;

const IconInfo = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  width: fit-content;
  font-size: 14px;
  gap: 10px;
  color: hsla(225, 15%, 17%, 0.8);
`;

type CardProps = {
  id: string;
  name: string;
  year?: number;
  region: string;
  location?: string;
  image?: {
    id: string;
    title: string;
    src: string;
  }[];
  intl_status?: {
    name?: string;
  }[];
  children?: React.ReactNode;
};

enum InternationalStatus {
  'Situs Warisan Dunia' = '#E98F53',
  'World Network of Biosphere Reserves' = '#60b9aa',
  'Taman Warisan ASEAN' = '#99D2FB',
  'Situs Ramsar' = '#EB726C',
  'Calon Situs Warisan Dunia' = '#D89EDD',
  'Unit Situs Warisan Dunia' = '#EBA2A2'
}

// https://stackoverflow.com/questions/55377365/what-does-keyof-typeof-mean-in-typescript
type InternationalStatusType = keyof typeof InternationalStatus;

const Card = ({ id, name, year, region, location, image, intl_status }: CardProps) => {
  return (
    <Container id={id}>
      {image?.at(0) && <Image src={image?.at(0)?.src} alt={image?.at(0)?.title} loading="lazy" />}

      {intl_status && intl_status?.length > 0 && (
        <StatusContainer>
          {intl_status?.map(({ name }) => (
            <Status bgColor={InternationalStatus[name as InternationalStatusType]} key={name}>
              {name}
            </Status>
          ))}
        </StatusContainer>
      )}
      <h4>{name}</h4>
      <IconInfo>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#BFBFBF" width="18" height="18">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>{`${region} • ${year}`}</p>
      </IconInfo>
      {location && (
        <IconInfo>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#BFBFBF"
            width="18"
            height="18"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p>{location}</p>
        </IconInfo>
      )}
    </Container>
  );
};

export default React.memo(Card);
