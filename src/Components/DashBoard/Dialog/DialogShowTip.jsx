/* eslint-disable react/prop-types */
export function DialogShowTip({tip}){
    return(
        <div>
        <h2 className="text-lg font-semibold mb-2">Detalles del Consejo</h2>
        <p><strong>Título:</strong> {tip.Title}</p>
        <p><strong>Descripción:</strong> {tip.Content}</p>
    </div>
    );
}