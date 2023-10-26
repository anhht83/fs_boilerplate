import { NextPageWithLayout } from "@/pages/page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";

const Home: NextPageWithLayout = () => {
  // filter items by status

  return (
    <>
      index
    </>
  );
};

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};

export default Home;
