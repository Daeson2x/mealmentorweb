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
          <main className="flex-1 ml-60 p-4 w-full max-w-full max-h-screen">
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4 border-r-4 border-gray-200 ">
                {/* Sección de Clientes */}
                <section className="flex-1 bg-white p-4 shadow-md  border-gray-300 rounded-3xl overflow-y-auto
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-gray-300
                  ">
                  <h2 className="text-xl font-semibold mb-4">Lista de Clientes</h2>
                  <ShowCustomers/>
                </section>
                <div className="flex flex-col flex-1 space-y-4">
                  <section className="flex-1 bg-white p-4 rounded- border-2 border-gray-300 rounded-3xl shadow-md overflow-y-auto
                  [&::-webkit-scrollbar]:w-1
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-gray-300" style={{ maxHeight: "350px", marginTop: "0px" }}>
                    <h2 className="text-xl font-semibold mb-2">Consejos</h2>
                    <ShowTips />
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
