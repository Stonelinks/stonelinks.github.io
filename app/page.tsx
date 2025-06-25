import { AllPostsList } from './components/AllPostsList';
import { AllProjectsList } from './components/AllProjectsList';
import { PageWrapper } from './components/PageWrapper';

const Home = () => {
  return (
    <PageWrapper>
      <AllProjectsList limit={5} />
      <AllPostsList limit={5} />
    </PageWrapper>
  );
};

export default Home;
