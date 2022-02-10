import * as React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import { devices } from '@/styles';
import Card from '@/components/Card';
import Tabs from '@/components/Tabs';
import Loader from '@/components/Loader';

const MainSection = styled.main`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 50px 100px;

  @media ${devices.mobile} {
    padding: 20px;
  }
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

  @media ${devices.mobile} {
    top: -180px;
    padding: 16px;
  }
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
  flex-wrap: wrap-reverse;
  gap: 15px;
`;

const MainCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

const Input = styled.input`
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 6px 12px;

  @media ${devices.mobile} {
    width: 100%;
  }
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
  const [search, setSearch] = React.useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSetRegion = (region: string) => {
    setRegion(Region[region as keyof typeof Region]);
  };

  const filterByRegion = (data: NationalPark[], region: Region) => {
    if (region === Region.All) return data;
    return data.filter((park: NationalPark) => Region[park.region as keyof typeof Region] === region);
  };

  const filterBySearch = (data: NationalPark[], search: string) => {
    return data.filter((park: NationalPark) => park.name.toLowerCase().includes(search.toLowerCase()));
  };

  React.useEffect(() => {
    if (!data) return;
    if (region === Region.All && search === '') {
      setTempData(data.nationalParks);
      return;
    }

    const regionFiltered = filterByRegion(data.nationalParks, region);
    const searchFiltered = filterBySearch(regionFiltered, search);

    setTempData(searchFiltered);
  }, [data, region, search]);

  return { data: tempData, loading, error, region, handleSetRegion, handleSearch };
};

const Main = () => {
  const { data, loading, error, region, handleSearch, handleSetRegion } = useQueryNationalParks();

  return (
    <MainSection>
      <MainContainer>
        <MainWrapper>
          <MainContent>
            <MainHeader>
              <Tabs items={regions} current={Region[region]} set={handleSetRegion}></Tabs>
              <Input type="text" name="text" onChange={handleSearch} placeholder="Search by name" />
            </MainHeader>
            {loading && <Loader />}
            {error && <p>Error! {error.message}</p>}
            <MainCards>
              {!loading &&
                data &&
                data.map((park: NationalPark) => {
                  return (
                    <Card
                      key={park.id}
                      id={park.id}
                      name={park.name.replace('Taman Nasional', '')}
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
