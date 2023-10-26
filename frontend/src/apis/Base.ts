import axios from "axios";
//import qs from "qs";

// axios.defaults.paramsSerializer = ((params: any) => qs.stringify(params)) as ParamsSerializerOptions;

const Base = axios.create({
  timeout: 60000,
  baseURL: process.env.NEXT_PUBLIC_ROOT_API
});

Base.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Base.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default Base;
