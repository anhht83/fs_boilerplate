import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<any>
  }
}

const defaultResponse = {
  onError: (error: any) => {
    const message = error.response.data?.message ?? error.message;
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
    return false;
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...defaultResponse,
      refetchOnWindowFocus: false,
      retry: false
    },
    mutations: {
      ...defaultResponse
    }
  }
});

export const useGetFetchQuery = (name: any) => {
  return queryClient.getQueryData(name);
};
