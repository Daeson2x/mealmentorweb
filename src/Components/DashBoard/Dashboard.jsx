import { TopLogo } from "../Misc/TopLogo";
import { Navigation } from "../Misc/Navigation";
import { ShowCustomers } from "../DashBoard/ShowCustomers";
import { ShowTips } from "../DashBoard/ShowTips";

export function Dashboard() {
  return (
    <>
      
      <div className="flex flex-col bg-gray-100 min-h-screen">
      <TopLogo/>
        <div className="flex">
          <Navigation />
          <main className="flex-1 lg:ml-60 p-4 w-full max-w-full flex flex-col space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4 flex-grow">
              <div className="flex-1 space-y-4">
                {/* Sección de Clientes */}
                <section className="bg-white p-4 shadow-md border-gray-300 rounded-3xl overflow-y-auto
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-gray-300"
                >
                  <h2 className="text-xl font-semibold mb-4">Lista de Clientes</h2>
                  <ShowCustomers />
                </section>
              </div>
              <div className="flex-1 space-y-4">
                {/* Sección de Tips */}
                <section className="bg-white p-4 rounded-3xl border-2 border-gray-300 shadow-md overflow-y-auto
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-gray-300"
                  style={{ maxHeight: "500px" }} // Ajusta maxHeight para pantallas más pequeñas
                >
                  <h2 className="text-xl font-semibold mb-4">Consejos</h2>
                  <ShowTips />
                </section>
              </div>
            </div>
          </main>

        </div>
      </div>
    </>
  );
}
