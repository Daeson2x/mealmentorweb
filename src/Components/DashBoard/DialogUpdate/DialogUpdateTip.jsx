/* eslint-disable react/prop-types */
import { updateDocID } from '../../Hooks/updateDocID'

export function DialogUpdateTip({tip}){

    const handleSubmit = (event) =>{
        event.preventDefault();
        const fields = Object.fromEntries(new window.FormData(event.target));
        updateDocID(fields, 'Tip', tip.id);
    }

    return(
        <div>
            <h2 className="text-lg font-bold mb-2">Editar Consejo</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Título:
                    <input name="Title" defaultValue={tip.Title} className="border rounded p-2 w-full" />
                </label>
                <label className="block mb-2">
                    Contenido:
                    <textarea name="Content" rows="10" cols="40" defaultValue={tip.Content} className="border border-gray-950 rounded p-2 w-full" />
                </label>
                <button type="submit" className="mt-4 w-full px-4 py-2 text-white rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out bg-yellow-500 ">Actualizar</button>
            </form>
        </div>
    );
}