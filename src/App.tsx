import * as React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import Hero from '@/components/Hero';

const Main = styled.main`
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

const Button = styled.button`
  font-weight: 600;
  text-align: center;
  color: hsla(0, 0%, 0%, 1);
  background-color: hsla(0, 0%, 100%, 1);
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background-color: white;
  padding: 15px;
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
  image?: {
    id: string;
    title: string;
    src: string;
  };
  intl_status?: [
    {
      name: string;
    }
  ];
}

const useQueryNationalParks = () => {
  const [region, setRegion] = React.useState('All');
  const [tempData, setTempData] = React.useState<NationalPark[] | []>([]);
  const { data, loading, error } = useQuery(nationalParksQuery);

  const filterByRegion = (region: string) => {
    setRegion(region);
  };

  React.useEffect(() => {
    if (!data) return;

    if (region === 'All') {
      setTempData(data.nationalParks);
    } else {
      setTempData(data.nationalParks.filter((park: NationalPark) => park.region === region));
    }
  }, [data, region]);

  return { data: tempData, loading, error, filterByRegion };
};

const MainSection = () => {
  const { data, loading, error, filterByRegion } = useQueryNationalParks();

  return (
    <Main>
      <MainContainer>
        <MainWrapper>
          <MainContent>
            <MainHeader>
              <Tabs>
                <Button
                  onClick={() => {
                    filterByRegion('All');
                  }}
                >
                  All
                </Button>
                <Button
                  onClick={() => {
                    filterByRegion('Jawa');
                  }}
                >
                  Jawa
                </Button>
              </Tabs>
              <input type="text" name="text"></input>
            </MainHeader>
            <MainCards>
              {loading && <p>Loading...</p>}
              {error && <p>Error! {error.message}</p>}
              {!loading &&
                data &&
                data.map((park: NationalPark) => {
                  return <Card key={park.id}>{park.name}</Card>;
                })}
            </MainCards>
          </MainContent>
        </MainWrapper>
      </MainContainer>
    </Main>
  );
};

const App = () => {
  return (
    <>
      <Hero />
      <MainSection />
    </>
  );
};

export default App;
