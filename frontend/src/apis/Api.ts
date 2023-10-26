import Base from "./Base";

const Api = {
  fetchData(param: any) {
    return new Promise((resolve, reject) => {
      Base(param)
        .then((response) => {
          resolve(response);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }
};

export default Api;
