const baseApiUrl = 'https://norma.education-services.ru/api';

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

const checkResponse = <T>(res: Response): Promise<ApiResponse<T>> => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(new Error(`Ошибка ${res.status}`));
};

const checkSuccess = <T>(res: ApiResponse<T>): Promise<T> => {
  if (res?.success) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    return res;
  }

  return Promise.reject(new Error(`Произошла ошибка!`));
};

export const request = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  return fetch(`${baseApiUrl}${endpoint}`, options)
    .then(checkResponse<T>)
    .then(checkSuccess<T>);
};
