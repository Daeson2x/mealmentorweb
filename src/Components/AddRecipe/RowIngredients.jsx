// eslint-disable-next-line react/prop-types
export function RowIngredients({ onChange, onRemove, Ingredients }){
    return(
        <>
        <input
        name="Ingredients"
        type="text" 
        required
        value={Ingredients}
        onChange={e => onChange("Ingredients", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md "
        placeholder="• Ingredientes"/>
        <input  className='delete-button cursor-pointer' onClick={onRemove} type="button" value='Eliminar'/>
        </>
    )
}