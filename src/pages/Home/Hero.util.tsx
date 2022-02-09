import Image1 from '@/assets/1.webp';
import Image2 from '@/assets/2.webp';
import Image3 from '@/assets/3.webp';
import Image4 from '@/assets/4.webp';
import Image5 from '@/assets/5.webp';
import Image6 from '@/assets/6.webp';

export type HeroImageType = {
  id: number;
  filename: string;
  location: string;
  nationalPark: string;
  author: {
    name: string;
    link: string;
  };
};

export const heroImage: HeroImageType[] = [
  {
    id: 1,
    filename: Image1,
    location: 'Pulau Padar',
    nationalPark: 'Taman Nasional Komodo',
    author: {
      name: 'Rizknas',
      link: 'https://unsplash.com/@rizknas'
    }
  },
  {
    id: 2,
    filename: Image2,
    location: 'Gunung Bromo',
    nationalPark: 'Taman Nasional Bromo Tengger Semeru',
    author: {
      name: 'Bayu Anggoro',
      link: 'https://unsplash.com/@kabutpelangi'
    }
  },
  {
    id: 3,
    filename: Image3,
    location: 'Gunung Bromo',
    nationalPark: 'Taman Nasional Bromo Tengger Semeru',
    author: {
      name: 'Kevin Zhang',
      link: 'https://unsplash.com/@shukaiz'
    }
  },
  {
    id: 4,
    filename: Image4,
    location: 'Wakatobi',
    nationalPark: 'Taman Nasional Wakatobi',
    author: {
      name: 'Benjamin L. Jones',
      link: 'https://unsplash.com/@boardshortsben'
    }
  },
  {
    id: 5,
    filename: Image5,
    location: 'Sembalun Lawang, Gunung Rinjani',
    nationalPark: 'Taman Nasional Gunung Rinjani',
    author: {
      name: 'Ari Saaski',
      link: 'https://unsplash.com/@weksman'
    }
  },
  {
    id: 6,
    filename: Image6,
    location: 'Gunung Merbabu',
    nationalPark: 'Taman Nasional Gunung Merbabu',
    author: {
      name: 'Dan Gilmour',
      link: 'https://unsplash.com/@dmgilmour'
    }
  }
];
