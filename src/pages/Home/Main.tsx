import * as React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import Card from '@/components/Card';

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

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
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

const useQueryNationalParks = () => {
  const { data, loading, error } = useQuery(nationalParksQuery);

  const [region, setRegion] = React.useState<Region>(Region.All);
  const [tempData, setTempData] = React.useState<NationalPark[] | []>([]);

  const filterByRegion = React.useCallback((region: Region) => {
    setRegion(region);
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
              <Tabs>
                {/* Loop over Region enum, filter non number, and render tab button */}
                {Object.keys(Region)
                  .filter((key) => isNaN(Number(key)))
                  .map((key: string) => {
                    return (
                      <Tab
                        key={key}
                        active={region === Region[key as keyof typeof Region]}
                        onClick={() => {
                          filterByRegion(Region[key as keyof typeof Region]);
                        }}
                      >
                        {key}
                      </Tab>
                    );
                  })}
              </Tabs>
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
