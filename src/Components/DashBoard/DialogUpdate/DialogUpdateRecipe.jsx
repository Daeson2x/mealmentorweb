import { makeArray } from '../../Logic/makeArray';
import { updateDocID } from '../../Hooks/updateDocID';

/* eslint-disable react/prop-types */
export function DialogUpdateRecipe({ recipe }) {
    const handleSubmit = (event) => {
        event.preventDefault();

        let ingredientsArray = makeArray(0, recipe.Ingredients.length, 'Ing', event);
        let stepsArray = makeArray(0, recipe.Steps.length, 'Stp', event);

        const fields = Object.fromEntries(new window.FormData(event.target));

        ingredientsArray.forEach((_, i) => delete fields['Ing' + i]);
        stepsArray.forEach((_, i) => delete fields['Stp' + i]);

        fields.Ingredients = ingredientsArray;
        fields.Steps = stepsArray;

        updateDocID(fields, 'Recipe', recipe.id);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-lg max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Actualizar Receta</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Receta:</label>
                    <input 
                        defaultValue={recipe.Title}
                        name="Title" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duración (minutos):</label>
                        <input 
                            type="number"
                            name="estimatedTime"
                            defaultValue={recipe.estimatedTime} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dificultad (1-5):</label>
                        <input 
                            type="number"
                            name="Difficulty"
                            defaultValue={recipe.Difficulty} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Precio (MXN):</label>
                        <input 
                            type="number"
                            name="Price"
                            defaultValue={recipe.Price} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Calorías:</label>
                        <input 
                            type="number"
                            name="Calories"
                            defaultValue={recipe.Calories} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                </div>

                <div>
                <label>Horario:</label>
              <select
              defaultValue={recipe.schedule}
                name="schedule"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled selected>Selecciona un horario</option>
                <option value="Desayuno">Desayuno</option>
                <option value="Comida">Comida</option>
                <option value="Cena">Cena</option>
              </select>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Ingredientes:</h3>
                    <ul className="space-y-2">
                        {recipe.Ingredients?.map((ingredient, index) => (
                            <li key={index} className="flex items-center">
                                <input 
                                    defaultValue={ingredient} 
                                    name={'Ing' + index} 
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Pasos:</h3>
                    <ul className="space-y-2">
                        {recipe.Steps?.map((step, index) => (
                            <li key={index} className="flex items-center">
                                <input 
                                    defaultValue={step} 
                                    name={'Stp' + index} 
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-center">
                <button type="submit" className="mt-4 w-full px-4 py-2 text-white rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out bg-yellow-500 ">Actualizar</button>
                </div>
            </form>
        </div>
    );
}
