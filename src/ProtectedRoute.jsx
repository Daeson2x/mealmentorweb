import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Obtener el token del localStorage

  // Si no hay token, redirigir a la página de login
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
