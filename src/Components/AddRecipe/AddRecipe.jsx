import "./AddRecipe.css"

//import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { dataBase } from '../../DataBase/Firebase';
import { collection, addDoc } from "firebase/firestore"
import Swal from "sweetalert2";

import { TopLogo } from '../Misc/TopLogo'
import { Navigation } from '../Misc/Navigation'
import { RowIngredients } from "./RowIngredients"
import { RowSteps } from "./RowSteps"

import { useState, useRef } from "react"
import { UpImage } from "./UpImage";

import { ShowRecipes } from "../DashBoard/ShowRecipes";

const defaultState = {
    Ingredients: [''],
    Steps: ['']
}

export function AddRecipe(){
    const [rows, setRows] = useState([defaultState]);
    const [rowsSteps, setRowsSteps] = useState([defaultState]);
    const [image, setImageUrl] = useState(null);
    const form = useRef()

    const handleOnChange = (index, name, value) => {
        const copyRows = [...rows];
        copyRows[index] = {
          ...copyRows[index],
          [name]: value
        };
        setRows(copyRows);
      };
    
      const handleOnAdd = () => {
        setRows(rows.concat(defaultState));
      };
    
      const handleOnRemove = index => {
        const copyRows = [...rows];
        copyRows.splice(index, 1);
        setRows(copyRows);
      };
      
      //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX////

      const handleOnChangeSteps = (index, name, value) => {
        const copyRows = [...rowsSteps];
        copyRows[index] = {
          ...copyRows[index],
          [name]: value
        };
        setRowsSteps(copyRows);
      };
    
      const handleOnAddSteps = () => {
        setRowsSteps(rowsSteps.concat(defaultState));
      };
    
      const handleOnRemoveSteps = index => {
        const copyRows = [...rowsSteps];
        copyRows.splice(index, 1);
        setRowsSteps(copyRows);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new window.FormData(event.target));
        const rowIngredients = rows.map(row => row.Ingredients);
        const rowSteps = rowsSteps.map(row => row.Steps);
        fields.Ingredients = rowIngredients;
        fields.Steps = rowSteps;
        fields.imageUrl = image;
        
        const addCustomerRef = collection(dataBase, 'Recipe');
        addDoc(addCustomerRef, fields)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Receta añadida correctamente',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        }).then(() => {
            window.location.reload();
        });
          form.current.reset();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              timer: 1500,
              timerProgressBar: true
          });
        });
    };


    //TODO: Añadir le funcion de mandar la base de datos

    return(
        <>
        <TopLogo />
<div className="Addrecipe-Div lg:ml-60 ">
  <Navigation />
  <div className="container mx-auto p-6 max-h-[calc(100vh-250px)]">
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col lg:flex-row">
      <section className="w-full lg:w-1/2 lg:mr-4">
        <h2 className="text-2xl font-bold mb-4">Añadir Nueva Receta</h2>
        <form className="space-y-4" onSubmit={handleSubmit} ref={form}>
          <div>
            <input
              type="text"
              name="Title"
              placeholder="Título de la receta"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Duración:</label>
              <input
                type="number"
                name="estimatedTime"
                placeholder="Duración"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label>Dificultad:</label>
              <input
                type="number"
                name="Difficulty"
                placeholder="Dificultad"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label>Precio:</label>
              <input
                type="number"
                name="Price"
                placeholder="Precio"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label>Calorías:</label>
              <input
                type="number"
                name="Calories"
                placeholder="Calorías"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label>Horario:</label>
              <input
                type="text"
                name="schedule"
                placeholder="Horario"
                list="options"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <datalist id="options">
                <option value="Desayuno" />
                <option value="Comida" />
                <option value="Cena" />
              </datalist>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Ingredientes (uno por línea)</label>
            <div className="flex flex-col space-y-2 ">
              {rows.map((row, index) => (
                <RowIngredients
                  {...row}
                  onChange={(name, value) => handleOnChange(index, name, value)}
                  onRemove={() => handleOnRemove(index)}
                  key={index}
                  className="block w-full "  // Asegurarse de que cada fila se muestre en bloque
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleOnAdd}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer mt-2"
            >
              Agregar Ingrediente
            </button>
          </div>
          <div>
            <label className="block font-semibold mb-1">Pasos de preparación</label>
            <div className="flex flex-col space-y-2">
              {rowsSteps.map((row, index) => (
                <RowSteps
                  {...row}
                  onChange={(name, value) => handleOnChangeSteps(index, name, value)}
                  onRemove={() => handleOnRemoveSteps(index)}
                  key={index}
                  className="block w-full"  // Asegurarse de que cada paso se muestre en bloque
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleOnAddSteps}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer mt-2"
            >
              Agregar Paso
            </button>
          </div>
          <div>
            <label className="block font-semibold mb-1">Imagen de la receta</label>
            <UpImage setImageUrl={setImageUrl} />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Añadir Receta
            </button>
          </div>
        </form>
      </section>

      <section className="w-full lg:w-1/2 bg-white p-6 rounded-md border border-gray-300 shadow-md lg:ml-4 mt-6 lg:mt-0">
        <h2 className="text-xl font-semibold mb-4">Recetas Existentes</h2>
        <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
          <ShowRecipes />
        </div>
      </section>
    </div>
  </div>
</div>

        </>
    )
}