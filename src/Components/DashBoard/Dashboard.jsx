import { TopLogo } from "../Misc/TopLogo";
import { Navigation } from "../Misc/Navigation";
import { ShowCustomers } from "../DashBoard/ShowCustomers";
import { ShowRecipes } from "../DashBoard/ShowRecipes"
import { ShowTips } from "../DashBoard/ShowTips";

export function Dashboard() {
    return (
      <>
        <TopLogo />
        <div className="flex flex-col bg-gray-100 min-h-screen">
          <div className="flex">
            <Navigation />
            <main className="flex-1 ml-60 p-4 w-full max-w-full"> {/* Espacio para la barra de navegación */}
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <section className="flex-1 bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Clientes</h2>
                    <ShowCustomers /> {/* Componente ShowCustomers */}
                  </section>
                  <section className="flex-1 bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Recetas</h2>
                    <ShowRecipes /> {/* Componente ShowRecipes */}
                  </section>
                  <section className="flex-1 bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Consejos</h2>
                    <ShowTips /> {/* Componente ShowTips */}
                  </section>
                </div>
                {/* Puedes añadir más secciones aquí si es necesario */}
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }