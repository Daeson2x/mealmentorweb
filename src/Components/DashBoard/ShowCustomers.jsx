import { useState } from "react";
import ReactDOM from 'react-dom';
import Swal from "sweetalert2";

import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { dataBase } from '../../DataBase/Firebase';
import { useDocs } from "../Hooks/useDocs";

import { DialogShowCustomer } from "./Dialog/DialogShowCustomer";
import { DialogUpdateCustomer } from "./DialogUpdate/DialogUpdateCustomer";

/*const ActiveCustomer = async (active, ID) => {
    try {
        const docRefCustomer = doc(dataBase, 'Customers', ID);
        await updateDoc(docRefCustomer, { Active: !active });
        Swal.fire({
            icon: 'success',
            title: 'Se han aplicado los cambios',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        }).then(() => {
            window.location.reload();
        });
    } catch (error) {
        console.error("Error updating document: ", error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            timer: 1500,
            timerProgressBar: true
        });
    }
};*/
const deleteCustomer = async (ID) => {
  try {
    // Referencia al documento del cliente
    const docRefCustomer = doc(dataBase, 'Customers', ID);
    const customerSnap = await getDoc(docRefCustomer);

    if (!customerSnap.exists()) {
      throw new Error('Customer not found');
    }

    // Obtener datos del cliente
    const customerData = customerSnap.data();
    const docRefPlan = customerData.plan_ID ? doc(dataBase, 'Plan', customerData.plan_ID) : null;  
    const docRefRecord = customerData.record_ID ? doc(dataBase, 'Record', customerData.record_ID) : null;

    // Inicializar datos
    let currentPlanData = null;
    let recordData = null;
    let docRefPlanAnt = null;
    let lastPlanData = null;

    // Obtener datos del registro solo si existe
    if (docRefRecord) {
      const recordSnap = await getDoc(docRefRecord);
      if (recordSnap.exists()) {
        recordData = recordSnap.data();
        docRefPlanAnt = recordData.plan_ID ? doc(dataBase, 'Plan', recordData.plan_ID) : null;

        // Obtener datos del plan anterior
        if (docRefPlanAnt) {
          const lastPlanSnap = await getDoc(docRefPlanAnt);
          lastPlanData = lastPlanSnap.data();
        }
      } else {
        throw new Error('Record not found');
      }
    }

    // Obtener datos del plan actual solo si existe
    if (docRefPlan) {
      const currentPlanSnap = await getDoc(docRefPlan);
      if (currentPlanSnap.exists()) {
        currentPlanData = currentPlanSnap.data();
      } else {
        console.log("Plan not found for the customer.");
      }
    }

    // Mostrar los datos en consola para verificar
    console.log("Customer Data:", customerData);
    if (currentPlanData) {
      console.log("Plan Data:", currentPlanData); 
    }
    if (recordData) {
      console.log("Record Data:", recordData); 
    }
    if (lastPlanData) {
      console.log("Previous Plan Reference:", lastPlanData);
    }

    // Eliminar documentos
    await Promise.all([
      deleteDoc(docRefCustomer),
      docRefPlan ? deleteDoc(docRefPlan) : null,
      docRefRecord ? deleteDoc(docRefRecord) : null,
      docRefPlanAnt ? deleteDoc(docRefPlanAnt) : null
    ]);

    Swal.fire({
      icon: 'success',
      title: 'Cliente eliminado',
      text: 'El cliente fue eliminado correctamente.',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      window.location.reload();
    });
  } catch (error) {
    console.error("Error retrieving documents: ", error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Hubo un error al obtener los datos. Por favor, inténtalo de nuevo.',
      timer: 1500,
      timerProgressBar: true
    });
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
          {/* Fondo oscuro que cubre toda la pantalla */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeDialog}></div>

          {/* Modal centrado */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
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
  {dialogInfo.isOpen && ReactDOM.createPortal(dialog, document.body)}
  {loading ? (
    <h1 className="text-center text-lg">No existen clientes...</h1>
  ) : (
    <div className="p-4">
      <ul className="space-y-4 max-h-[80vh] overflow-y-auto">
        {data?.map(customer => (
          <li key={customer.id} className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row items-start sm:items-center p-4 overflow-auto">
              <img src="User.png" alt="Imagen de usuario" className="w-12 h-12 rounded-full mb-2 sm:mb-0 sm:mr-4" />
              <div className="flex-1">
                <p className="font-semibold text-lg">{customer.Name + ' ' + customer.LastName}</p>
                <span className="text-sm text-gray-500">Objetivo: {customer.Goal} | IMC: {customer.IMC}</span>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => showDialog('ver', customer)}>Ver</button>
                <button 
                  className={`px-3 py-1 rounded bg-green-500 text-white`} 
                  onClick={() => deleteCustomer(customer.id)}
                >
                  Eliminar
                </button>
                <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => showDialog('act', customer)}>Edit</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )}
</>

    );
}
