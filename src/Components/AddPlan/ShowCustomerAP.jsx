import { useState } from 'react';
import { DialogFormPlan } from './DIalogs/DialogFormPlan';
import { DialogUpdatePlan } from './DIalogs/DialogUpdatePlan';
import { dataBase } from '../../DataBase/Firebase';
import { useDocs } from '../Hooks/useDocs';

import ReactDOM from 'react-dom';
import './ShowCustomersAP.css'

export function ShowCustomersAP(){
    const [loading, setLoading] = useState(false)
    const [activeDialog, setActiveDialog] = useState({isOpen: false, type: null, customer: null});

    const {data} = useDocs(dataBase, 'Customers', setLoading);

    const showDialog = (type, customer) => {
        setActiveDialog({isOpen: true, type, customer})
    };
    const closeDialog = () => {
        setActiveDialog({ isOpen: false, type: null, customer: null });
    };

    const dialogContent = () => {
        const {type, customer} = activeDialog;
        switch (type) {
            case 'add':
                return <DialogFormPlan customer={customer}/>;
            case 'act':
                return <DialogUpdatePlan customer={customer}/>;
            default:
                return null;
        }
    };

    const dialog = activeDialog.isOpen && (
        <>
            <div className="overlay" onClick={closeDialog}></div>
            <dialog open className="customer-dialog">
                {dialogContent(activeDialog,)}
                <button onClick={closeDialog} id="closeDialog">Cerrar</button>
            </dialog>
        </>
    );

    return(
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
                        <p className="text-lg font-semibold">{customer.Name}</p>
                        <span className="text-gray-500">
                        Objetivo: {customer.Goal} | IMC: {customer.IMC}
                        </span>
                    </div>
                    </section>

                    <section className="ml-auto flex space-x-2">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
                        onClick={() => showDialog('add', customer)}
                    >
                        Añadir
                    </button>
                    <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
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