import axios, { AxiosRequestConfig } from 'axios';

import { OidcUserModel } from '../features/auth/types';

const api = axios.create({
  headers: {
    'Content-type': 'application/json'
  }
});

const addAuthorizationHeader = (user: OidcUserModel, config: AxiosRequestConfig) => {
  if (!user.token_type || !user.access_token) {
    console.error('Authorization header was not added in request');

    return config;
  }

  config.headers.Authorization = `${user.token_type} ${user.access_token}`;

  return config;
};

type AddRequestInterceptorsSettings = {
  user: OidcUserModel;
};

const addRequestInterceptors = ({ user }: AddRequestInterceptorsSettings) => {
  const interceptorId = api.interceptors.request.use(config => {
    return addAuthorizationHeader(user, config);
  });

  const eject = () => {
    api.interceptors.request.eject(interceptorId);
  };

  return { eject };
};

type AddResponseInterceptorsSettings = {
  onUnauthorized: () => void;
};

const addResponseInterceptors = ({
  onUnauthorized
}: AddResponseInterceptorsSettings) => {
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        onUnauthorized();
      } else {
        return Promise.reject(error);
      }
    }
  );
};

export { addRequestInterceptors, addResponseInterceptors };

export default api;
