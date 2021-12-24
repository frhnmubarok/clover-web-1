import Main from '@/components/atoms/Main';
import AppLayout from '@/components/templates/AppLayout';

export default function ProductDetail() {
  return (
    <>
      <Main className="relative min-h-screen">
        <div className="container relative pt-20"></div>
      </Main>
    </>
  );
}

ProductDetail.layoutProps = {
  Layout: AppLayout,
  meta: {
    title: 'Clover',
  },
};
