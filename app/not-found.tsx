import { PageWrapper } from '@/components/PageWrapper';

const NotFoundPage = () => {
  return (
    <PageWrapper>
      <h1 className="mb-2">404 - Page Not Found</h1>
      <p className="mb-4 text-gray-600">Sorry, that page does not exist.</p>
    </PageWrapper>
  );
};

export default NotFoundPage;
