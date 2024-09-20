import { makeArray } from "../../Logic/makeArray";
import { useState, useRef } from 'react';

import { dataBase } from '../../../DataBase/Firebase';
import { doc, updateDoc } from "firebase/firestore";

import { useDoc } from "../../Hooks/useDoc";

/* eslint-disable react/prop-types */
export function DialogUpdatePlan({ customer }) {
    const currentDate = new Date().toISOString().split('T')[0];
    const [loading, setLoading] = useState(true);

    const form = useRef();

    const { data } = useDoc(dataBase, 'Plan', customer.plan_ID, setLoading);

    const handleSubmit = (event) => {
        event.preventDefault();
        let daysArray = makeArray(1, 8, 'Day', event);
        const fields = Object.fromEntries(new window.FormData(event.target));
        for (let i = 1; i <= daysArray.length; i++) {
            delete fields['Day' + i];
        }
        fields.content = daysArray;

        (async () => {
            try {
                const docRef = doc(dataBase, 'Plan', customer.plan_ID);
                await updateDoc(docRef, fields);
                alert("Plan actualizado correctamente");
                form.current.reset();
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        })();
    };

    const arrayDays = Array(7).fill(null);

    return (
        
        <section className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Actualizar Plan de {customer.Name + ' ' + customer.LastName}</h1>
            <form onSubmit={handleSubmit} ref={form} className="space-y-4">
                {loading ? (
                    <p className="text-center text-gray-600">No existe Plan...</p>
                ) : (
                    <>
                        <div>
                            <label className="block text-md font-medium text-gray-700">Calorías</label>
                            <input
                            type="number"
                            defaultValue={data.Calories}
                            required
                            name="Calories"
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <section className="grid grid-cols-3 gap-4">
                        {arrayDays.map((_, day) => (
                            <div key={day} className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">
                                Día {day + 1}
                            </label>
                            <textarea
                                name={'Day' + (day + 1)}
                                defaultValue={data.content[day]}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                            />
                            </div>
                        ))}
                        </section>
                        <div className="mt-4">
          <label className="block text-lg font-medium text-gray-700">Inicio de plan</label>
          <input
                                name="startDate"
                                type="date"
                                min={currentDate}
                                defaultValue={data.startDate}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Actualizar
        </button>
                    </>
                )}
            </form>
        </section>
    );
}
