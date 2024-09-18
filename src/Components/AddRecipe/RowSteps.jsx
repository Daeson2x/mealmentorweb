// eslint-disable-next-line react/prop-types
export function RowSteps({ onChange, onRemove, Steps }){
    return(
        <>
        <input
        name="Steps"
        type="text" 
        required
        value={Steps}
        onChange={e => onChange("Steps", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="• Paso"/>
        <input className='delete-button cursor-pointer' onClick={onRemove} type="button" value='Eliminar'/>
        </>
    )
}
