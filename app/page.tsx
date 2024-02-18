import Link from 'next/link';
import { Routes } from '@/constants/endpoints';

const Home = () => {
  return (
    <div>
      <p>Home</p>
      <Link href={Routes.dashboard}>Go to Dashboard</Link>
    </div>
  );
};

export default Home;
