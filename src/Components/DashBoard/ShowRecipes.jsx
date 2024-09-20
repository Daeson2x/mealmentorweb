import { useState } from "react";
import ReactDOM from 'react-dom';

import { DialogShowRecipe } from "./Dialog/DialogShowRecipe";
import { DialogUpdateRecipe } from "./DialogUpdate/DialogUpdateRecipe";

import { dataBase } from '../../DataBase/Firebase';
import { useDocs } from "../Hooks/useDocs";

export function ShowRecipes() {
    const [activeDialog, setActiveDialog] = useState({ isOpen: false, type: null, recipe: null });
    const [loading, setLoading] = useState(false);

    const { data } = useDocs(dataBase, 'Recipe', setLoading);

    const showDialog = (type, recipe) => {
        setActiveDialog({ isOpen: true, type, recipe });
    };

    const closeDialog = () => {
        setActiveDialog({ isOpen: false, type: null, recipe: null });
    };

    const dialogContent = () => {
        const { type, recipe } = activeDialog;
        switch (type) {
            case 'ver':
                return <DialogShowRecipe recipe={recipe} />;
            case 'act':
                return <DialogUpdateRecipe recipe={recipe} />;
            default:
                return null;
        }
    };

    const dialog = activeDialog.isOpen && (
        <>
            {/* Fondo oscuro que cubre toda la pantalla */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeDialog}></div>

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                    {dialogContent()}
                    <button onClick={closeDialog} className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Cerrar
                    </button>
                </div>
            </div>
        </>
    );

    return (
        <>
            {ReactDOM.createPortal(dialog, document.body)}
            {loading ? (
                <h1 className="text-center">No existen recetas...</h1>
            ) : (
                <ul className="space-y-4 p-4">
                    {data?.map((recipe) => (
                        <li key={recipe.id} className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                            <div className="flex items-center p-4">
                                <img src="RecipeAdd.png" alt="Imagen de receta" className="w-12 h-12 rounded-full mr-4" />
                                <div className="flex-1">
                                    <p className="font-semibold text-lg">{recipe.Title}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => showDialog('ver', recipe)}>Ver</button>
                                    <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => showDialog('act', recipe)}>Edit</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
