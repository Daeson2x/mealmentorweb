import ReactDOM from 'react-dom/client';
import { Login } from './Login.jsx';
import { Dashboard } from './Components/DashBoard/Dashboard.jsx';
import { AddCostumer } from './Components/AddCustomer/AddCosumer.jsx';
import { AddRecipe } from './Components/AddRecipe/AddRecipe.jsx';
import { AddPlan } from './Components/AddPlan/AddPlan.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx'; // Asegúrate de que la ruta sea correcta
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/Dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/AddCustomer',
    element: (
      <ProtectedRoute>
        <AddCostumer />
      </ProtectedRoute>
    ),
  },
  {
    path: '/AddRecipe',
    element: (
      <ProtectedRoute>
        <AddRecipe />
      </ProtectedRoute>
    ),
  },
  {
    path: '/AddPlan',
    element: (
      <ProtectedRoute>
        <AddPlan />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
