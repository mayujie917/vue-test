import axios from "axios";
// import qs from 'qs';

let service = axios.create({
  // 测试: http://123.57.230.57:6012
  baseURL: "http://122.97.130.155:19001/prod-api/",
  // baseURL: "http://123.57.230.57:6012",
  timeout: 10000,
  // headers: { "Content-Type": "application/json;charset=utf-8" },
});

//http request 拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // config.data = JSON.stringify(config.data);
    //设置请求头
    // config.headers = {
    //   // "Content-Type": "application/x-www-form-urlencoded",
    // };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(err);
  }
);
//http response 拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.errCode == 2) {
      router.push({
        path: "/login",
        querry: { redirect: router.currentRoute.fullPath }, //从哪个页面跳转
      });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    service
      .put(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      );
  });
}
