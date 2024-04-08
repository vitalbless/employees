import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

//мой хост , можно заменить на переменную из env.
//api/user или employees будут идти через эту ссылку
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  //prepareHeaders: (headers, { getState }) => {const token = (getState()as RootState).auth},
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
