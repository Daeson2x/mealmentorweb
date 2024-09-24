import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from 'firebase/firestore';
import CryptoJS from 'crypto-js';
import { useState } from "react";
import { dataBase } from './DataBase/Firebase';
import * as React from 'react';
import Swal from 'sweetalert2';


export default function Form() {
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleMove = async (event) => {
    event.preventDefault();
    const fields = Object.fromEntries(new window.FormData(event.target));

    try {
      const usersRef = collection(dataBase, 'Nutritionist');
      const q = query(usersRef, where('userAdmin', '==', fields.user));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError(null);
        const userData = querySnapshot.docs[0].data();
        setUserData(userData);
        const passSalt = fields.pass + userData.salt;
        const passHash = CryptoJS.SHA256(passSalt).toString(CryptoJS.enc.Hex);
        if (passHash === userData.passAdmin) {
          Swal.fire({
            icon:"success",
            title:"Bienvenido",
            text:"Has iniciado sesion correctamente.",
          
 
          }).then(() => {
            navigate('/Dashboard');
        });
          
          navigate('/Dashboard');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Correo o contraseña incorrectos',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Correo o contraseña incorrectos',
        });
      }
    } catch (error) {
      setError('An error occurred, please try again later');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred, please try again later',
      });
      console.error('Login failed:', error);
    }
  };

  return (
  
    <div className="bg-white px-10 py-20 rounded-3xl border-gray-600">
      <h1 className="text-5xl font-semibold">Bienvenid@ de vuelta</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">Por favor, introduce tus credenciales.</p>
      <form onSubmit={handleMove} className="mt-8">
        <div>
          <label className="text-lg font-medium">Email</label>
          <input 
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Ingresa tu correo"
            name="user"
          />
        </div>
        <div>
          <label className="text-lg font-medium">Contraseña</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Ingresa tu contraseña"
            type="password"
            name="pass"
          />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div>
            <input
              type="checkbox"
              id="remember"
            />
            <label className="ml-2 font-medium text-base" htmlFor="remember">Recordarme por 30 días</label>
          </div>
          <button className="font-medium text-base text-cyan-800">Olvidaste tu contraseña?</button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out py-3 rounded-xl bg-cyan-950 text-white text-lg font-bold">Iniciar Sesión</button>
        </div>
      </form>
    </div>
  );
}
