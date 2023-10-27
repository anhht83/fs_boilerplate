import { NextPageWithLayout } from "@/pages/page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPageWithLayout = () => {
  const { push } = useRouter();
  useEffect(() => {
    push("/inspections");
  }, []);
  return null;
};

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};

export default Home;
