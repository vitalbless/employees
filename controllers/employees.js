const prisma = require('../prisma/prisma-client');

/**
 * @route GET /api/employees
 * @description Получение всех сотрудников
 * @access private
 */
const all = async (req, res) => {
  try {
    //поиск всех сотрудников
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch {
    res.status(500).json({ message: 'Не удалось получить сотрудников' });
  }
};

/**
 * @route POST /api/employees/add
 * @description Добавление сотрудника
 * @access private
 */
const add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.adress || !data.age) {
      return res.status(400).json({ message: 'Все поля обязательны!' });
    }
    //Здесь мы изем сотрудника который сейчас добавляет пользователя в базе данных по его id и добавить ему данные в таблицу сотрудники из (data )
    const employee = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        createdEmployee: {
          create: data,
        },
      },
    });
    return res.status(201).json(employee);
  } catch {
    return res.status(500).json({ message: 'Что-то пошло не так' });
  }
};
module.exports = { all, add };
