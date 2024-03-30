const prisma = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/**
 *
 * @route POST /api/user/login
 * @desc Логин
 * @access Public
 */
const login = async (req, res) => {
  try {
    //деструктуризируем поля из того что пришло и проверяем их
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Пожалуйста, заполните обязательные поля' });
    }
    const user = await prisma.user.findFirst({ where: { email: email } });
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;
    if (user && isPasswordCorrect) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
      });
    } else {
      return res
        .status(400)
        .json({ message: 'Неверно введен логин или пароль' });
    }
  } catch {
    return res.status(500).json({ message: 'Что то пошло не так' });
  }
};
/**
 *
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //проверки
    if (!name || !password || !email) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }
    const registeredUser = await prisma.user.findFirst({ where: { email } });
    if (registeredUser) {
      return res
        .status(400)
        .json({ message: 'Пользователь, с таким email уже существует!' });
    }
    //строка которая будет добавлять к нашему хэшу пароля
    const salt = await bcrypt.genSalt(10);
    //хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, salt);
    //создаем юзера из того что нам пришло
    const user = await prisma.user.create({
      data: { email: email, name: name, password: hashedPassword },
    });
    //строка для расшифровки захэшированного пароля
    const secret = process.env.JWT_SECRET;
    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        //пишем что будем хэшировать в первом аргументе в sing , второй через что будем, третий на сколько времени будет действовать токен
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
      });
    } else {
      return res
        .status(400)
        .json({ message: 'Не удалось создать пользователя' });
    }
  } catch {
    return res.status(500).json({ message: 'Что то пошло не так' });
  }
};
/**
 *
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user);
};
module.exports = {
  login,
  current,
  register,
};
