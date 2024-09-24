import { useState } from 'react';
import ReactDOM from 'react-dom';

import { dataBase } from '../../DataBase/Firebase';
import { useDocs } from '../Hooks/useDocs';

import { DialogShowTip } from './Dialog/DialogShowTip';
import { DialogUpdateTip } from './DialogUpdate/DialogUpdateTip';

export function ShowTips() {
    const [loading, setLoading] = useState(false);
    const [activeDialog, setActiveDialog] = useState({ isOpen: false, type: null, tip: null });

    const { data } = useDocs(dataBase, 'Tip', setLoading);

    const showDialog = (type, tip) => {
        setActiveDialog({ isOpen: true, type, tip });
    };

    const closeDialog = () => {
        setActiveDialog({ isOpen: false, type: null, tip: null });
    };

    const dialogContent = () => {
        const { type, tip } = activeDialog;
        switch (type) {
            case 'ver':
                return <DialogShowTip tip={tip} />;
            case 'act':
                return <DialogUpdateTip tip={tip} />;
            default:
                return null;
        }
    };

    const dialog = activeDialog.isOpen && (
        <>
            {/* Fondo oscuro que cubre toda la pantalla */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeDialog}></div>

            {/* Modal centrado */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                    {dialogContent()}
                    <button onClick={closeDialog} className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out">
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
                <h1 className="text-center text-lg">Cargando...</h1>
            ) : (
                <ul className="space-y-4 p-4 overflow-y-auto" style={{ maxHeight: "440px" }}>
                    {data?.map((tip) => (
                        <li key={tip.id} className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden ">
                            <div className="flex items-center p-4 flex-col sm:flex-row">
                                <img src="recomendation.webp" alt="Imagen de consejo" className="w-12 h-12 rounded-full mr-4" />
                                <div className="flex-1">
                                    <p className="font-semibold text-lg">{tip.Title}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => showDialog('ver', tip)}>Ver</button>
                                    <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => showDialog('act', tip)}>Edit</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}