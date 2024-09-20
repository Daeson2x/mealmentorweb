import { makeArray } from '../../Logic/makeArray';
import { useState, useRef } from 'react';

import { dataBase } from '../../../DataBase/Firebase';
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

/* eslint-disable react/prop-types */
export function DialogFormPlan({ customer }) {
  const currentDate = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const form = useRef();

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const actualizarDocumento = async (documentId, newData, docu) => {
    try {
      const docRef = doc(dataBase, docu, documentId);
      await updateDoc(docRef, newData);
      console.log(`${docu} actualizado correctamente`);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let docRef = null;
    let docRefRecord = null;
    let daysArray = makeArray(1, 8, 'Day', event);
    const fields = Object.fromEntries(new window.FormData(event.target));
    for (let i = 1; i <= daysArray.length; i++) {
      delete fields['Day' + i];
    }
    fields.content = daysArray;
    try {
      const addPlanRef = collection(dataBase, 'Plan');
      docRef = await addDoc(addPlanRef, fields);
      Swal.fire({
        title: 'Añadido correctamente!',
        text: `Plan de ${customer.Name + ' ' + customer.LastName} añadido correctamente!`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        window.location.reload();
    });
      form.current.reset();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al añadir el plan al cliente. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
      console.error("Error adding document: ", error);
    }

    if (customer.record_ID === null && customer.plan_ID === null) {
      const recordData = {
        customerID: customer.id,
        plan_ID: docRef.id,
        planAssignedDate: fields.startDate
      };
      try {
        const addRecordRef = collection(dataBase, 'Record');
        docRefRecord = await addDoc(addRecordRef, recordData);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      const newDataCustomer = {
        plan_ID: docRef.id,
        record_ID: docRefRecord.id
      };

      actualizarDocumento(customer.id, newDataCustomer, 'Customers');
    } else {
      const newRecordData = {
        plan_ID: customer.plan_ID
      };

      (async () => {
        try {
          const docRef = doc(dataBase, 'Record', customer.record_ID);
          await updateDoc(docRef, newRecordData);
          console.log(`Record actualizado correctamente`);
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      })();

      const newDataCustomer = {
        plan_ID: docRef.id,
      };

      (async () => {
        try {
          const docRef = doc(dataBase, 'Customers', customer.id);
          await updateDoc(docRef, newDataCustomer);
          console.log(`Customers actualizado correctamente`);
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      })();
    }
  };

  const arrayDays = Array(7).fill(null);

  return (
    <section className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {customer.plan_ID === null
          ? `Plan Nutricional de ${customer.Name + ' ' + customer.LastName}`
          : `Nuevo Plan de ${customer.Name + ' ' + customer.LastName}`}
      </h1>
      <form onSubmit={handleSubmit} ref={form} className="space-y-4">
        <input
          type="number"
          placeholder="Calorías"
          required
          name="Calories"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <section className="grid grid-cols-3 gap-4">
          {arrayDays.map((_, day) => (
            <div key={day} className="space-y-1">
              <label className="block text-lg font-medium text-gray-700">
                Día {day + 1}
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                name={'Day' + (day + 1)}
                autoCapitalize="sentences"
                autoComplete="on"
                autoFocus
                placeholder="Recomendación Nutricional"
                required   
              />
            </div>
          ))}
        </section>
        <div className="mt-4">
          <label className="block text-lg font-medium text-gray-700">Inicio de plan</label>
          <input
            name="startDate"
            required
            type="date"
            id="date-plan"
            pattern="\d{4}-\d{2}-\d{2}"
            defaultValue={selectedDate}
            onChange={handleDateChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Agregar
        </button>
      </form>
    </section>
  );
}
