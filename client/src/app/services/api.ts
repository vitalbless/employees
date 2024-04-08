import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

//мой хост , можно заменить на переменную из env.
//api/user или employees будут идти через эту ссылку
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  //prepareHeaders: (headers, { getState }) => {const token = (getState()as RootState).auth},
});
//если какой то сервер не отвечает  , то в maxretries пишем условно значение 1 , то есть повторить один и тот же запрос 3 раза если он не выполнился
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

//endpoints в дальнейшем можно расширять
export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
