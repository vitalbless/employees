const jwt = require('jsonwebtoken');
const prisma = require('../prisma/prisma-client');

const auth = async (req, res, next) => {
  try {
    //split работает так что : ' ' — в одинарных скобочках мы указали разделитель в данном случае это пробел , то есть делить будем по пробелам , bearer нам не нужен он из за разделителя будет под
    //цифрой 0 , а уже наш токен будет по цифрой 1 , поэтому и указываем что берем 1 значение из массива.
    let token = req.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Не авторизован' });
  }
};

module.exports = {
  auth,
};
