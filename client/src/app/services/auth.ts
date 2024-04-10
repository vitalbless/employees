//роуты связанные с аунтификацией
import { User } from '@prisma/client';
import { api } from './api';

//мы отсылаем серверу данные без id , так как он формируется на стороне сервера и удаляем id через Omit
export type UserData = Omit<User, 'id'>;
// Определяем тип данных ответа от сервера при успешной аутентификации
type ResponseLoginData = User & { token: string };

// Создаём API для авторизации, интегрируя его с основным API
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Определяем конечную точку для авторизации пользователя
    login: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        //это ссылка на роут user.js в папке router api/user/login
        url: '/users/login',
        method: 'POST',
        body: userData,
      }),
    }),
    register: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        //это ссылка на роут user.js в папке router api/user/register
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
    }),
    current: builder.query<ResponseLoginData, void>({
      query: () => ({
        //это ссылка на роут user.js в папке router api/user/current
        url: '/users/current',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } =
  authApi;

export const {
  endpoints: { login, register, current },
} = authApi;
