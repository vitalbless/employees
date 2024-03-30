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
    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: 'Все поля обязательны!' });
    }
    //Здесь мы изем сотрудника который сейчас добавляет пользователя в базе данных по его id и добавить ему данные в таблицу сотрудники из (data )
    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });
    return res.status(201).json(employee);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Что-то пошло не так' });
  }
};
/**
 * @route POST /api/employees/remove/:id
 * @description Удаление сотрудника
 * @access private
 */
const remove = async (req, res) => {
  try {
    const { id } = req.body;
    await prisma.employee.delete({
      where: {
        id: id,
      },
    });
    return res.status(204).json('Ok');
  } catch {
    return res.status(500).json({ message: 'Не удалось удалить сотрудника' });
  }
};
/**
 * @route PUT /api/employees/edit/:id
 * @description Удаление сотрудника
 * @access private
 */
const edit = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await prisma.employee.update({
      where: {
        id: id,
      },
      data: data,
    });
    return res.status(204).json('Ok');
  } catch {
    return res.status(500).json({ message: 'Не удалось изменить сотрудника' });
  }
};
/**
 * @route PUT /api/employees/:id
 * @description Получение сотрудника
 * @access private
 */
const employee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });
    return res.status(200).json(employee);
  } catch {
    return res.status(500).json({ message: 'Не удалось получить сотрудника' });
  }
};
module.exports = { all, add, remove, edit, employee };
