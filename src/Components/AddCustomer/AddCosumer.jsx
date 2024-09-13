import { TopLogo } from '../Misc/TopLogo';
import { Navigation } from '../Misc/Navigation';
import { useState, useRef } from 'react';
import { generateSalt } from '../Logic/generateSalt.mjs';
import CryptoJS from 'crypto-js';
import { dataBase } from '../../DataBase/Firebase';
import { collection, addDoc } from "firebase/firestore";

export function AddCostumer() {
    const defaultCustomer = {
        Active: true,
        Allergies: [''],
        Goal: "",
        IMC: 0,
        LastName: "",
        Name: "",
        Password: "",
        Preferences: [''],
        UserName: "",
    };

    const form = useRef();
    const [changeCard, setChangeCard] = useState(defaultCustomer);
    const [active, setActive] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new window.FormData(event.target));

        fields.Active = active;
        fields.Allergies = fields.Allergies.split(/,\s*|\s*y\s*/);
        fields.Preferences = fields.Preferences.split(/,\s*|\s*y\s*/);
        fields.plan_ID = null;
        fields.record_ID = null;
        const saltRandom = generateSalt();
        const passwordWithSalt = fields.Password + saltRandom;
        const passHash = CryptoJS.SHA256(passwordWithSalt).toString(CryptoJS.enc.Hex);
        fields.Password = passHash;
        fields.Salt = saltRandom;

        console.log(fields);

        const addCustomerRef = collection(dataBase, 'Customers');
        addDoc(addCustomerRef, fields)
            .then(() => {
                alert('Cliente añadido correctamente');
                form.current.reset();
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    };

    return (
        <>
            <TopLogo />
            <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
                    <Navigation />
                    <section className="mt-6">
                        <form className="space-y-4" onSubmit={handleSubmit} ref={form}>
                            <div className="flex flex-col space-y-2">
                                <input
                                    name='Name'
                                    placeholder='Nombre'
                                    className='block w-full p-2 border border-gray-300 rounded-lg'
                                    required
                                    onChange={(e) => {
                                        setChangeCard(prevState => ({
                                            ...prevState,
                                            Name: e.target.value
                                        }));
                                    }}
                                />
                                <input
                                    name='LastName'
                                    placeholder='Apellido'
                                    className='block w-full p-2 border border-gray-300 rounded-lg'
                                    required
                                    onChange={(e) => {
                                        setChangeCard(prevState => ({
                                            ...prevState,
                                            LastName: e.target.value
                                        }));
                                    }}
                                />
                                <input
                                    name='Goal'
                                    placeholder='Objetivo'
                                    list='options'
                                    className='block w-full p-2 border border-gray-300 rounded-lg'
                                    required
                                    onChange={(e) => {
                                        setChangeCard(prevState => ({
                                            ...prevState,
                                            Goal: e.target.value
                                        }));
                                    }}
                                />
                                <datalist id='options'>
                                    <option value='Bajar de peso'>Bajar de peso</option>
                                    <option value='Subir de peso'>Subir de peso</option>
                                    <option value='Subir de Masa'>Subir de Masa</option>
                                    <option value='Balanceado'>Balanceado</option>
                                </datalist>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <input
                                    name='UserName'
                                    placeholder='Nombre de usuario'
                                    className='block w-full p-2 border border-gray-300 rounded-lg'
                                    required
                                    onChange={(e) => {
                                        setChangeCard(prevState => ({
                                            ...prevState,
                                            UserName: e.target.value
                                        }));
                                    }}
                                />
                                <input
                                    name='Password'
                                    placeholder='Contraseña'
                                    className='block w-full p-2 border border-gray-300 rounded-lg'
                                    required
                                    onChange={(e) => {
                                        setChangeCard(prevState => ({
                                            ...prevState,
                                            Password: e.target.value
                                        }));
                                    }}
                                />
                                <input
                                    name='IMC'
                                    placeholder='IMC'
                                    type='number'
                                    className='block w-full p-2 border border-gray-300 rounded-lg'
                                    required
                                    onChange={(e) => {
                                        setChangeCard(prevState => ({
                                            ...prevState,
                                            IMC: e.target.value
                                        }));
                                    }}
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <input
                                    name='Allergies'
                                    placeholder='Alergias'
                                    className='block w-full p-2 border border-gray-300 rounded-lg'
                                    required
                                    onChange={(e) => {
                                        setChangeCard(prevState => ({
                                            ...prevState,
                                            Allergies: e.target.value
                                        }));
                                    }}
                                />
                                <div className="flex items-center space-x-2">
                                    <input
                                        type='checkbox'
                                        checked={active}
                                        onChange={() => setActive(!active)}
                                        className="form-checkbox"
                                        id="alergias"
                                    />
                                    <label htmlFor='alergias' className="ml-2">{active ? 'Desactivar' : 'Activar'}</label>
                                </div>
                                <input
                                    name='Preferences'
                                    placeholder='Preferencias'
                                    className='block w-full p-2 border border-gray-300 rounded-lg'
                                    required
                                    onChange={(e) => {
                                        setChangeCard(prevState => ({
                                            ...prevState,
                                            Preferences: e.target.value
                                        }));
                                    }}
                                />
                            </div>
                            <input
                                type='submit'
                                value='Agregar'
                                className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 cursor-pointer'
                            />
                        </form>
                        <div className="mt-6 bg-white shadow-md rounded-lg p-4">
                            <div className="flex items-center space-x-4 mb-4">
                                <img src='User.png' alt='Img de usuario' className='w-16 h-16 rounded-full' />
                                <div>
                                    <p className="text-lg font-semibold">{changeCard.Name + ' ' + changeCard.LastName}</p>
                                    <p>Objetivo: {changeCard.Goal} | IMC: {changeCard.IMC}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <p className="font-semibold">Usuario: {changeCard.UserName}</p>
                                <p className="font-semibold">Contraseña: {changeCard.Password}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Alergias:</p>
                                <p>{changeCard.Allergies.join(', ')}</p>
                                <p className="font-semibold">Preferencias:</p>
                                <p>{changeCard.Preferences.join(', ')}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
