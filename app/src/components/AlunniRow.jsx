import { useState } from "react";

const defaultConfirmationState = {
    state: false,
    action: null
};

const AlunniRow = ({ alunno, setAlunni }) => {
    const [confirmationState, setConfirmationState] = useState(defaultConfirmationState);
    const [isUpdating, setIsUpdating] = useState(false);

    const [updateName, setUpdateName] = useState(alunno.nome);
    const [updateCognome, setUpdateCognome] = useState(alunno.cognome);

    const handleConfirmationAcceptance = () => {
        switch (confirmationState.action) {
            case "delete":
                handleDelete(alunno.id);
                break;
            case "update":
                handleUpdate();
                break;
            default:
        }
        setConfirmationState(defaultConfirmationState);
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/alunni/${id}`, { 
                method: "DELETE" 
            });
            const data = await res.json();

            if (!data.success) {
                return alert(`Error: ${data.message}`);
            }

            setAlunni(prev => prev.filter(alunno => alunno.id !== id));
        } catch (error) {
            alert("Errore durante l'eliminazione.");
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: updateName,
                    cognome: updateCognome
                })
            });
            const data = await res.json();

            if (!data.success) {
                alert(`Error: ${data.message}`);
                return;
            }

            setAlunni(prev => prev.map(a => a.id === alunno.id ? { ...a, nome: updateName, cognome: updateCognome } : a));
            setIsUpdating(false);
        } catch (error) {
            alert("Errore durante l'aggiornamento.");
            setIsUpdating(false);
        }
    };

    return (
        <div className="border border-black flex justify-center items-center text-xl gap-5">
            <div>
                <div>
                    {isUpdating ? (
                        <input
                            type="text"
                            value={updateName}
                            onChange={e => setUpdateName(e.target.value)}
                        />
                    ): (
                        <p>
                            Nome: {alunno.nome}
                        </p>
                    )}
                </div>
                <div>
                    {isUpdating ? (
                        <input
                            type="text"
                            value={updateCognome}
                            onChange={e => setUpdateCognome(e.target.value)}
                        />
                    ): (
                        <p>
                            Cognome: {alunno.cognome}
                        </p>
                    )}
                </div>
            </div>
            <div className="text-sm flex gap-3">
                {confirmationState.state ? (
                    <>
                        <div>Sei sicuro?</div>
                        <button onClick={handleConfirmationAcceptance} className="cursor-pointer">Sì</button>
                        <button onClick={() => {
                            setConfirmationState(defaultConfirmationState);
                            setIsUpdating(false);
                        }} className="cursor-pointer">No</button>
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
                        <button 
                            className="border border-black px-2 py-0.5 cursor-pointer"
                            onClick={() => {
                                setIsUpdating(true);
                                setConfirmationState({ state: true, action: "update" });
                            }}
                        >
                            Modifica2
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AlunniRow;