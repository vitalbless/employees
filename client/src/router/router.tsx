import { createBrowserRouter } from 'react-router-dom';
import { Paths } from '../paths';
import Login from '../pages/login';
import Register from '../pages/register';
import Employees from '../pages/employees';

const router = createBrowserRouter([
  { path: Paths.home, element: <Employees /> },
  { path: Paths.login, element: <Login /> },
  { path: Paths.register, element: <Register /> },
]);
export default router;
