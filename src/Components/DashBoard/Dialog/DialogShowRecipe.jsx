/* eslint-disable react/prop-types */
export function DialogShowRecipe({ recipe }) {
    return (
        <>
            <section className="p-6 bg-white rounded-lg shadow-md max-w-lg">
                <h1 className="text-2xl font-bold mb-4">{recipe.Title}</h1>
                <div className="mb-4">
                    <p className="text-gray-600">Dificultad: {recipe.Difficulty}/10 | Tiempo: {recipe.estimatedTime}m</p>
                    <p className="text-gray-600">Precio: {recipe.Price} | Calorías: {recipe.Calories} | Horario: {recipe.schedule}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Ingredientes: </h3>
                    <ul className="list-disc list-inside space-y-1">
                        {recipe.Ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Pasos: </h3>
                    <ul className="list-decimal list-inside space-y-1">
                        {recipe.Steps.map((step, index) => (
                            <li key={index}>
                                {step}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}
