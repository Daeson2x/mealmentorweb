import { TopLogo } from '../Misc/TopLogo';
import { Navigation } from '../Misc/Navigation';
import { useState, useRef } from 'react';
import { generateSalt } from '../Logic/generateSalt.mjs';
import CryptoJS from 'crypto-js';
import { dataBase } from '../../DataBase/Firebase';
import { collection, addDoc } from "firebase/firestore";
import Swal from 'sweetalert2';


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
    const [rawPassword, setRawPassword] = useState(""); // Para mostrar la contraseña sin el hash en la tarjeta

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
                Swal.fire({
                    title: '¡Cliente añadido!',
                    text: 'El cliente fue añadido correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                form.current.reset();
                setChangeCard(defaultCustomer); // Reiniciar la tarjeta después de añadir
                setRawPassword(""); // Reiniciar la contraseña sin hash en la tarjeta
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al añadir el cliente. Por favor, inténtalo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
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
                        <h1 className='text-3xl font-semibold mb-4 text-center'>Añadir cliente</h1>
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
                                <select
                                    name='Goal'
                                    className='block w-full p-2 border border-gray-300 rounded-lg'
                                    required
                                    onChange={(e) => {
                                        setChangeCard(prevState => ({
                                            ...prevState,
                                            Goal: e.target.value
                                        }));
                                    }}
                                >
                                    <option value='' disabled selected>Selecciona un objetivo</option>
                                    <option value='Bajar de peso'>Bajar de peso</option>
                                    <option value='Subir de peso'>Subir de peso</option>
                                    <option value='Subir de Masa'>Subir de Masa</option>
                                    <option value='Balanceado'>Balanceado</option>
                                </select>
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
                                    type='password'
                                    className='block w-full p-2 border border-gray-300 rounded-lg'
                                    required
                                    onChange={(e) => {
                                        setChangeCard(prevState => ({
                                            ...prevState,
                                            Password: e.target.value
                                        }));
                                        setRawPassword(e.target.value); // Guardar la contraseña sin hashear
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
                                            Allergies: e.target.value.split(/,\s*|\s*y\s*/)
                                        }));
                                    }}
                                />
                                <div className="flex items-center space-x-2">
                                    <input
                                        type='checkbox'
                                        checked={active}
                                        onChange={() => setActive(!active)}
                                        className="form-checkbox"
                                        id="active"
                                    />
                                    <label htmlFor='active' className="ml-2">{active ? 'Desactivar' : 'Activar'}</label>
                                </div>
                                <input
                                    name='Preferences'
                                    placeholder='Preferencias'
                                    className='block w-full p-2 border border-gray-300 rounded-lg'
                                    required
                                    onChange={(e) => {
                                        setChangeCard(prevState => ({
                                            ...prevState,
                                            Preferences: e.target.value.split(/,\s*|\s*y\s*/) // Convertir string a array
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
                                <p className="font-semibold">Contraseña: {rawPassword}</p> {/* Mostrar la contraseña real */}
                            </div>
                            <div>
                                <p className="font-semibold">Alergias:</p>
                                <p>{Array.isArray(changeCard.Allergies) ? changeCard.Allergies.join(', ') : ''}</p> {/* Verificación de array */}
                                <p className="font-semibold">Preferencias:</p>
                                <p>{Array.isArray(changeCard.Preferences) ? changeCard.Preferences.join(', ') : ''}</p> {/* Verificación de array */}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

