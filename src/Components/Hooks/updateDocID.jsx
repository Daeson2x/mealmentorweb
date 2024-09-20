import { doc, updateDoc } from 'firebase/firestore';
import { dataBase } from '../../DataBase/Firebase';
import Swal from 'sweetalert2';

export const updateDocID  = async (newData, collection, ID) =>{
    try {
        const docRef = doc(dataBase, collection, ID);
        await updateDoc(docRef, newData);
        Swal.fire({
            title: '¡Actualizado!',
            text: 'Actualizado correctamente!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'An error occurred, please try again later',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        console.error("Error updating document: ", error);
    }
}