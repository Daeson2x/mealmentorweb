import { useState } from "react";
import ReactDOM from 'react-dom';

import { doc, updateDoc } from 'firebase/firestore';
import { dataBase } from '../../DataBase/Firebase';
import { useDocs } from "../Hooks/useDocs";

import { DialogShowCustomer } from "./Dialog/DialogShowCustomer";
import { DialogUpdateCustomer } from "./DialogUpdate/DialogUpdateCustomer";

const ActiveCustomer = async (active, ID) => {
    try {
        const docRef = doc(dataBase, 'Customers', ID);
        await updateDoc(docRef, { Active: !active });
        alert('Actualizado correctamente');
        window.location.reload();
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export function ShowCustomers() {
    const [loading, setLoading] = useState(false);
    const [dialogInfo, setDialogInfo] = useState({ isOpen: false, type: null, customer: null });

    const color = {
        red: '#a41f1f',
        green: '#669667'
    };

    const { data } = useDocs(dataBase, 'Customers', setLoading);

    const showDialog = (type, customer) => {
        setDialogInfo({ isOpen: true, type, customer });
    };

    const closeDialog = () => {
        setDialogInfo({ isOpen: false, type: null, customer: null });
    };

    const dialogContent = () => {
        const { type, customer } = dialogInfo;
        switch (type) {
            case 'ver':
                return <DialogShowCustomer customer={customer} />;
            case 'act':
                return <DialogUpdateCustomer customer={customer} />;
            default:
                return null;
        }
    };

    const dialog = dialogInfo.isOpen && (
        <>
            <div className="fixed inset-0 bg-black opacity-50" onClick={closeDialog}></div>
            <dialog open className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg w-80">
                {dialogContent()}
                <button onClick={closeDialog} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Cerrar</button>
            </dialog>
        </>
    );

    return (
        <>
            {dialogInfo.isOpen && ReactDOM.createPortal(dialog, document.body)}
            {loading ? (
                <h1 className="text-center">No existen clientes...</h1>
            ) : (
                <ul className="space-y-4 p-4">
                    {data?.map(customer => (
                        <li key={customer.id} className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                            <div className="flex items-center p-4">
                                <img src="User.png" alt="Imagen de usuario" className="w-12 h-12 rounded-full mr-4" />
                                <div className="flex-1">
                                    <p className="font-semibold text-lg">{customer.Name + ' ' + customer.LastName}</p>
                                    <span className="text-sm text-gray-500">Objetivo: {customer.Goal} | IMC: {customer.IMC}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => showDialog('ver', customer)}>Ver</button>
                                    <button 
                                        className={`px-3 py-1 rounded ${customer.Active ? 'border-2 border-green-500' : 'border-2 border-red-500'} text-black`} 
                                        onClick={() => ActiveCustomer(customer.Active, customer.id)}
                                    >
                                        {customer.Active ? 'Desac' : 'Activar'}
                                    </button>
                                    <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => showDialog('act', customer)}>Edit</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
