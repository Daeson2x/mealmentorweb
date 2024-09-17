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
            <div className="fixed inset-0 bg-black opacity-50" onClick={closeDialog}></div>
            <dialog open className="fixed top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg w-120 z-50">
                {dialogContent()}
                <button onClick={closeDialog} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Cerrar</button>
            </dialog>
        </>
    );

    return (
        <>
            {ReactDOM.createPortal(dialog, document.body)}
            {loading ? (
                <h1 className="text-center">Cargando...</h1>
            ) : (
                <ol className="space-y-4 p-4">
                    {data?.map((tip) => (
                        <li key={tip.id} className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                            <div className="flex items-center p-4">
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
                </ol>
            )}
        </>
    );
}
