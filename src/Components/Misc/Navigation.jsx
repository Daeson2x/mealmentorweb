import { useNavigate } from "react-router-dom";

export function Navigation() {
  const pages = {
    Home: '/DashBoard',
    AddCustomer: '/AddCustomer',
    AddRecipe: '/AddRecipe',
    AddPlan: '/AddPlan',
  };
  const navigate = useNavigate();

  return (
    <aside className="w-60 bg-white h-full p-4 fixed left-0 top-14 border-r-4 border-gray-200 shadow-md">
      <div className="space-y-2 mt-2">
        <button
          className="flex items-center w-full p-3 text-black rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-sans font-medium leading-5 text-left whitespace-nowrap overflow-hidden text-ellipsis"
          onClick={() => navigate(pages.Home)}
        >
          <img src="Home.png" alt="Inicio" className="w-5 h-5 mr-3" />
          <span className="flex-1">Inicio</span>
        </button>
        <button
          className="flex items-center w-full p-3 text-black rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-sans font-medium leading-5 text-left whitespace-nowrap overflow-hidden text-ellipsis"
          onClick={() => navigate(pages.AddCustomer)}
        >
          <img src="UserAdd.png" alt="Añadir Cliente" className="w-5 h-5 mr-3" />
          <span className="flex-1">Añadir cliente</span>
        </button>
        <button
          className="flex items-center w-full p-3 text-black rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-sans font-medium leading-5 text-left whitespace-nowrap overflow-hidden text-ellipsis"
          onClick={() => navigate(pages.AddRecipe)}
        >
          <img src="RecipeAdd.png" alt="Añadir receta" className="w-5 h-5 mr-3" />
          <span className="flex-1">Añadir receta</span>
        </button>
        <button
          className="flex items-center w-full p-3 text-black rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-sans font-medium leading-5 text-left whitespace-nowrap overflow-hidden text-ellipsis"
          onClick={() => navigate(pages.AddPlan)}
        >
          <img src="PlanAdd.png" alt="Añadir plan" className="w-5 h-5 mr-3" />
          <span className="flex-1">Añadir plan</span>
        </button>
      </div>
    </aside>
  );
}
