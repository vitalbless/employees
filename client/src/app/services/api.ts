import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

//мой хост , можно заменить на переменную из env.
//api/user или employees будут идти через эту ссылку
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  prepareHeaders: (headers, { getState }) => {
    //мы получаем токен из нашего localstorage или state и привязываем его к запросу
    const token =
      (getState() as RootState).auth.user?.token ||
      localStorage.getItem('token');
    if (token && token !== null) {
      headers.set('authorization', `Bearer ${token}`);
    }
  },
});
// Настраиваем повтор запроса, если сервер не отвечает
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

// Создаём наш инструмент для работы с API
export const api = createApi({
  // Указываем путь, где будут храниться данные из запросов
  reducerPath: 'splitApi',
  // Устанавливаем наш базовый запрос с возможностью повтора
  baseQuery: baseQueryWithRetry,
  // Говорим инструменту обновлять данные при каждой загрузке страницы или изменении аргументов запроса
  refetchOnMountOrArgChange: true,
  // Здесь можно добавлять разные запросы к серверу, но пока не добавляем ничего
  endpoints: () => ({}),
});
