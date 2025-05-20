import { useState } from "react";

const defaultConfirmationState = {
    state: false,
    action: null
};

const AlunniRow = ({ alunno, setAlunni }) => {
    const [confirmationState, setConfirmationState] = useState(defaultConfirmationState);

    const handleConfirmationAcceptance = () => {
        switch (confirmationState.action) {
            case "delete":
                handleDelete(alunno.id);
                break;
            default:
        }

        setConfirmationState(defaultConfirmationState);
    };

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:8080/alunni/${id}`, { 
            method: "DELETE" 
        }).then(res => res.json());

        if (!res.success) {
            return alert(`Error: ${res.message}`);
        }

        setAlunni(prev => prev.filter(alunno => alunno.id !== id));
    };

    return (
        <div className="border border-black flex justify-center items-center text-xl gap-5">
            <div>
                <div>
                    Nome: {alunno.nome}
                </div>
                <div>
                    Cognome: {alunno.cognome}
                </div>
            </div>
            <div className="text-sm flex gap-3">
                {confirmationState.state ? (
                    <>
                        <div>Sei sicuro?</div>
                        <button onClick={() => handleConfirmationAcceptance()} className="cursor-pointer">Sì</button>
                        <button onClick={() => setConfirmationState(defaultConfirmationState)} className="cursor-pointer">No</button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setConfirmationState({ state: true, action: "delete"})}
                            className="border border-black px-2 py-0.5 cursor-pointer"
                        >
                            Elimina
                        </button>
                        <button 
                            className="border border-black px-2 py-0.5 cursor-pointer"
                            onClick={() => window.location.href = "/users/update/" + alunno.id}
                        >
                            Modifica
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AlunniRow;