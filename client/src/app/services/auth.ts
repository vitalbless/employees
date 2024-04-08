//роуты связанные с аунтификацией
import { User } from '@prisma/client';
import { api } from './api';

//мы отсылаем серверу данные без id , так как он формируется на стороне сервера и удаляем id через Omit
export type UserData = Omit<User, 'id'>;
type ResponseLoginData = User & { token: string };

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        //это ссылка на роут user.js в папке router api/user/login
        url: '/user/login',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});
