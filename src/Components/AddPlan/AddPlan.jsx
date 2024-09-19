import { TopLogo } from '../Misc/TopLogo'
import { Navigation } from '../Misc/Navigation'
import { ShowCustomersAP } from './ShowCustomerAP'

import './AddPlan.css'

export function AddPlan(){

    return(
        <>
        <TopLogo/>
        <div className='PlanDiv '>
            <div className='lg:w-1/2'>
                <Navigation/>
                <main className="flex-1 lg:ml-60 p-4 w-full max-w-full flex flex-col space-y-4 md:space-y-0">
                    <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4 flex-grow">
                    <div className="flex-1 space-y-4">
                        {/* Sección de Clientes */}
                        <section className="bg-white p-4 shadow-md border-gray-300 rounded-3xl overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Lista de Clientes</h2>
                        <ShowCustomersAP />
                        </section>
                    </div>
                    </div>
                </main>
            </div>
        </div>
        </>
    )
}