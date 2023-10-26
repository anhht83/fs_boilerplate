import type { AppProps } from "next/app";
import "../assets/styles/app.css";
import { NextPageWithLayout } from "@/pages/page";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../apis/query_client";

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
}

export default MyApp;
