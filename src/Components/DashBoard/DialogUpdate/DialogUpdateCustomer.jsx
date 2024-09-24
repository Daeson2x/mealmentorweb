import { updateDocID } from '../../Hooks/updateDocID';
import CryptoJS from 'crypto-js';

/* eslint-disable react/prop-types */
export function DialogUpdateCustomer({ customer }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new window.FormData(event.target));
        fields.Allergies = fields.Allergies.split(/,\s*|\s*y\s*/);
        fields.Preferences = fields.Preferences.split(/,\s*|\s*y\s*/);
        
        if (fields.Password !== customer.Password) {
            const passwordWithSalt = fields.Password + customer.Salt;
            const passHash = CryptoJS.SHA256(passwordWithSalt).toString(CryptoJS.enc.Hex);
            fields.Password = passHash;
        }
        updateDocID(fields, 'Customers', customer.id);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-4">Actualizar datos de {`${customer.Name} ${customer.LastName}`}</h1>
            <form onSubmit={handleSubmit}>
                <section className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="Name">Nombre</label>
                        <input id="Name" defaultValue={customer.Name} name="Name" className="border rounded p-2 w-full" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="LastName">Apellido</label>
                        <input id="LastName" defaultValue={customer.LastName} name="LastName" className="border rounded p-2 w-full" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="Goal">Objetivo</label>
                        <select
                                    defaultValue={customer.Goal}
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
                </section>
                <section className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="UserName">Nombre de Usuario</label>
                        <input id="UserName" defaultValue={customer.UserName} name="UserName" className="border rounded p-2 w-full" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="Password">Contraseña</label>
                        <input id="Password" type="password" defaultValue={customer.Password} name="Password" className="border rounded p-2 w-full" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="IMC">IMC</label>
                        <input id="IMC" defaultValue={customer.IMC} name="IMC" className="border rounded p-2 w-full" />
                    </div>
                </section>
                <section className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="Allergies">Alergias (separadas por comas)</label>
                        <input id="Allergies" defaultValue={customer.Allergies.join(', ')} name="Allergies" className="border rounded p-2 w-full" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="Preferences">Preferencias (separadas por comas)</label>
                        <input id="Preferences" defaultValue={customer.Preferences.join(', ')} name="Preferences" className="border rounded p-2 w-full" />
                    </div>
                </section>
                <section>
                    <input type="submit" value="Actualizar" className="w-full bg-yellow-500 text-white rounded p-2 transition-transform transform hover:scale-105" />
                </section>
            </form>
        </div>
    );
}
