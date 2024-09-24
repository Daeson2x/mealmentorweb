
import { dataBase } from '../../../DataBase/Firebase';
import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';

/* eslint-disable react/prop-types */
export function DialogShowCustomer({ customer }) {
    const defaultPlan = {
        Calories: '',
        content: [''],
        startDate: ''
    };
    const [loading, setLoading] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(defaultPlan);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const docRef = doc(dataBase, 'Plan', customer.plan_ID);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data());
                    setLoading(false);
                } else {
                    console.log('No such document in Plan!');
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };
        loadInitialData();
    }, [customer.plan_ID]);

    const changePlan = async () => {
        setLoading(true);
        setClicked(!clicked);
        try {
            if (!clicked) {
                const docRef = doc(dataBase, 'Record', customer.record_ID);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const recordData = docSnap.data();
                    const anotherDocRef = doc(dataBase, 'Plan', recordData.plan_ID);
                    const anotherDocSnap = await getDoc(anotherDocRef);
                    if (anotherDocSnap.exists()) {
                        setData(anotherDocSnap.data());
                    } else {
                        console.log('No such document in Plan!');
                    }
                } else {
                    console.log('No such document in Record!');
                }
            } else {
                const planDocRef = doc(dataBase, 'Plan', customer.plan_ID);
                const planDocSnap = await getDoc(planDocRef);
                if (planDocSnap.exists()) {
                    setData(planDocSnap.data());
                } else {
                    console.log('No such document in Plan!');
                }
            }
        } catch (error) {
            console.error("Error getting document:", error);
        }
        setLoading(false);
    };

    const arrayDays = Array(7).fill(null);

    return (
        <section className="p-4 sm:p-2 bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto">
            <div id="Name-Dialog-Customer" className="flex items-center mb-2">
                <img src="User.png" alt="User" className="w-8 h-8 rounded-full" />
                <div className="ml-4">
                    <p className="text-lg font-bold">{customer.Name + ' ' + customer.LastName}</p>
                    <span className="text-sm">Objetivo: {customer.Goal} | IMC: {customer.IMC}</span>
                </div>
            </div>
            <div id="UserName-Dialog-Customer" className="mb-2">
                <p className="text-md font-medium">Usuario: {customer.UserName}</p>
            </div>
            <div id="AllergiesanPreferences-Dialog-Customer" className="mb-2">
                <p className="font-medium">Alergias: {customer.Allergies.join(', ')} </p>
                <p className="font-medium mt-2">Preferencias: {customer.Preferences.join(', ')}</p>
            </div>

            {loading ? (
                <h1 className="text-center text-xl">No existe plan...</h1>
            ) : (
                <div className='overflow-y-auto'>
                    <p id="dateAssigned" className="text-lg">
                        Calorías: {data.Calories} | Fecha asignada: {data.startDate}
                    </p>
                    <button className="mt-2 w-full bg-lime-800 text-white rounded px-4 py-2" onClick={changePlan}>
                        {clicked ? 'Mostrar Plan Actual' : 'Mostrar Plan Anterior'}
                    </button>
                    
                    <section className='overflow-y-auto'>
                        <section className="grid grid-cols-2 gap-4 overflow-y-auto">
                            {arrayDays.map((_, day) => (
                                <div key={day} className="space-y-2">
                                    <label className="block text-lg font-medium text-gray-700">
                                        Día {day + 1}
                                    </label>
                                    <textarea
                                        readOnly
                                        name={'Day' + (day + 1)}
                                        defaultValue={data.content[day]}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    />
                                </div>
                            ))}
                        </section>
                    </section>
                    
                </div>
            )}
        </section>
    );
}
