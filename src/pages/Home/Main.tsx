import * as React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import Card from '@/components/Card';
import Tabs from '@/components/Tabs';

const MainSection = styled.main`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 50px 100px;
`;

const MainContainer = styled.div`
  position: relative;
  width: 100%;
`;

const MainWrapper = styled.div`
  top: -230px;
  position: absolute;
  background-color: white;
  border-radius: 6px;
  padding: 32px;
  width: 100%;
`;

const MainContent = styled.div`
  display: grid;
  grid-row: column;
  gap: 1rem;
`;

const MainHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MainCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

const nationalParksQuery = gql`
  query getNationalParks {
    nationalParks {
      id
      name
      year
      region
      location
      image {
        id
        title
        src
      }
      intl_status {
        name
      }
    }
  }
`;

interface NationalPark {
  id: string;
  name: string;
  year?: number;
  region: string;
  location?: string;
  image?: [
    {
      id: string;
      title: string;
      src: string;
    }
  ];
  intl_status?: [
    {
      name: string;
    }
  ];
}

enum Region {
  All,
  Jawa,
  Sumatra,
  Sulawesi,
  Kalimantan,
  'Maluku dan Papua',
  'Bali dan Nusa Tenggara'
}

const regions = Object.keys(Region).filter((key) => isNaN(Number(key)));

const useQueryNationalParks = () => {
  const { data, loading, error } = useQuery(nationalParksQuery);

  const [region, setRegion] = React.useState<Region>(Region.All);
  const [tempData, setTempData] = React.useState<NationalPark[] | []>([]);

  const filterByRegion = React.useCallback((region: string) => {
    setRegion(Region[region as keyof typeof Region]);
  }, []);

  React.useEffect(() => {
    if (!data) return;

    if (region === Region.All) {
      setTempData(data.nationalParks);
    } else {
      setTempData(
        data.nationalParks.filter((park: NationalPark) => Region[park.region as keyof typeof Region] === region)
      );
    }
  }, [data, region]);

  return { data: tempData, loading, error, region, filterByRegion };
};

const Main = () => {
  const { data, loading, error, region, filterByRegion } = useQueryNationalParks();

  return (
    <MainSection>
      <MainContainer>
        <MainWrapper>
          <MainContent>
            <MainHeader>
              <Tabs items={regions} current={Region[region]} set={filterByRegion}></Tabs>
              <input type="text" name="text"></input>
            </MainHeader>
            <MainCards>
              {loading && <p>Loading...</p>}
              {error && <p>Error! {error.message}</p>}
              {!loading &&
                data &&
                data.map((park: NationalPark) => {
                  return (
                    <Card
                      key={park.id}
                      id={park.id}
                      name={park.name}
                      location={park.location}
                      intl_status={park.intl_status}
                      region={park.region}
                      year={park.year}
                      image={park.image}
                    />
                  );
                })}
            </MainCards>
          </MainContent>
        </MainWrapper>
      </MainContainer>
    </MainSection>
  );
};

export default Main;
