import { createListenerMiddleware } from '@reduxjs/toolkit';
import { authApi } from '../app/services/auth';

export const listenerMiddleware = createListenerMiddleware(); // Создание прослушивателя действий

listenerMiddleware.startListening({
  // Запуск прослушивателя и настройка его поведения
  matcher: authApi.endpoints.login.matchFulfilled, // Определение условия срабатывания прослушивателя: успешный запрос на вход (login)
  effect: async (action, listenerApi) => {
    // Определение действий, выполняемых при срабатывании прослушивателя
    listenerApi.cancelActiveListeners(); // Отмена активных прослушивателей
    if (action.payload.token) {
      // Проверка наличия токена в ответе от сервера
      localStorage.setItem('token', action.payload.token); // Сохранение токена пользователя в локальном хранилище браузера
    }
  },
});
