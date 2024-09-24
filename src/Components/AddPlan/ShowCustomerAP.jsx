import { useState } from 'react';
import { DialogFormPlan } from './DIalogs/DialogFormPlan';
import { DialogUpdatePlan } from './DIalogs/DialogUpdatePlan';
import { dataBase } from '../../DataBase/Firebase';
import { useDocs } from '../Hooks/useDocs';

import ReactDOM from 'react-dom';
import './ShowCustomersAP.css'

export function ShowCustomersAP() {
    const [loading, setLoading] = useState(false);
    const [activeDialog, setActiveDialog] = useState({ isOpen: false, type: null, customer: null });

    const { data } = useDocs(dataBase, 'Customers', setLoading);

    const showDialog = (type, customer) => {
        setActiveDialog({ isOpen: true, type, customer });
    };
    const closeDialog = () => {
        setActiveDialog({ isOpen: false, type: null, customer: null });
    };

    const dialogContent = () => {
        const { type, customer } = activeDialog;
        switch (type) {
            case 'add':
                return <DialogFormPlan customer={customer} />;
            case 'act':
                return <DialogUpdatePlan customer={customer} />;
            default:
                return null;
        }
    };

    const dialog = activeDialog.isOpen && (
        <>
            {/* Fondo oscuro para el modal */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeDialog}></div>

            {/* Modal con clases de Tailwind */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-100hv max-w-3xl">
                    {dialogContent()}
                    <button onClick={closeDialog} className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out">
                      Cerrar
                  </button>
                </div>
            </div>
        </>
    );

    return (
        <>
            {activeDialog.isOpen && ReactDOM.createPortal(dialog, document.body)}
            {loading ? (
                <p className="text-center">Cargando...</p>
            ) : (
                <div className='p-4'>
                    <ul className="space-y-4 max-h-[75vh] overflow-y-auto">
                        {data?.map((customer) => (
                            <div
                                className="flex items-center bg-white shadow rounded-lg p-4"
                                key={customer.id}
                            >
                                <section className="flex items-center">
                                    <img
                                        src="User.png"
                                        alt="User"
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold">{customer.Name + " " + customer.LastName} </p>
                                        <span className="text-gray-500">
                                            Objetivo: {customer.Goal} | IMC: {customer.IMC}
                                        </span>
                                    </div>
                                </section>

                                <section className="ml-auto flex space-x-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                                        onClick={() => showDialog('add', customer)}
                                    >
                                        Añadir
                                    </button>
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white  py-1 px-3 rounded"
                                        onClick={() => showDialog('act', customer)}
                                    >
                                        Actualizar
                                    </button>
                                </section>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
