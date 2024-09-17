import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export function TopLogo() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Función para abrir y cerrar el menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Función para verificar el tamaño de la pantalla
  const handleResize = () => {
    if (window.innerWidth >= 1024) { // 1024px es el tamaño de pantalla para lg en Tailwind
      setIsOpen(false);
    }
  };

  // Usar el hook useEffect para agregar el listener de resize
  useEffect(() => {
    // Añadir el listener en el montaje
    window.addEventListener('resize', handleResize);
    
    // Ejecutar handleResize al inicio para aplicar el estado correcto
    handleResize();

    // Limpiar el listener en el desmontaje
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pages = {
    Home: '/DashBoard',
    AddCustomer: '/AddCustomer',
    AddRecipe: '/AddRecipe',
    AddPlan: '/AddPlan',
  };

  return (
    <div className="navbar flex items-center p-2 bg-white border-b-4 relative">
      {/* Menú Off-Canvas */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white text-black transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4">
          <button 
            onClick={toggleMenu} 
            className="text-black lg:hidden"
          >
            <i className="bi bi-x-lg text-black text-2xl"></i>
          </button>
        </div>
        <nav className="px-2">
          <ul>
            <li>
              <button
                className="flex items-center w-full p-3 text-black rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-sans font-medium leading-5 text-left whitespace-nowrap overflow-hidden text-ellipsis"
                onClick={() => navigate(pages.Home)}
              >
                <img src="Home.png" alt="Inicio" className="w-5 h-5 mr-3" />
                <span className="flex-1">Inicio</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center w-full p-3 text-black rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-sans font-medium leading-5 text-left whitespace-nowrap overflow-hidden text-ellipsis"
                onClick={() => navigate(pages.AddCustomer)}
              >
                <img src="UserAdd.png" alt="Añadir Cliente" className="w-5 h-5 mr-3" />
                <span className="flex-1">Añadir cliente</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center w-full p-3 text-black rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-sans font-medium leading-5 text-left whitespace-nowrap overflow-hidden text-ellipsis"
                onClick={() => navigate(pages.AddRecipe)}
              >
                <img src="RecipeAdd.png" alt="Añadir receta" className="w-5 h-5 mr-3" />
                <span className="flex-1">Ver/Añadir recetas</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center w-full p-3 text-black rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-sans font-medium leading-5 text-left whitespace-nowrap overflow-hidden text-ellipsis"
                onClick={() => navigate(pages.AddPlan)}
              >
                <img src="PlanAdd.png" alt="Añadir plan" className="w-5 h-5 mr-3" />
                <span className="flex-1">Añadir plan</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Botón para abrir el menú - Solo visible en pantallas md o menores */}
      <button 
        onClick={toggleMenu} 
        className="p-2 text-white rounded mr-4 block lg:hidden"
      >
        <i className="bi bi-list text-black text-2xl"></i>
      </button>

      {/* Logo */}
      <div className="w-7 h-7 logo flex items-center space-x-1">
        <img src="/MealMentorLogo.webp" alt="Logo de MealMentor" />
        <p className="text-1xl font-bold text-gray-700">MealMentor</p>
      </div>
    </div>
  );
}
