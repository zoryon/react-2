import { useState } from "react";

const AlunniTable = (props) => {
    const { alunni: initialAlunni } = props;
    const [alunni, setAlunni] = useState(initialAlunni);

    async function handleDelete(id) {
        const accepted = window.confirm("Vuoi davvero cancellare questo alunno?");
        if (!accepted) return;

        const res = await fetch("http://localhost:8080/alunni", { 
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        }).then(res => res.json());

        if (!res.success) return alert(`Error: ${res.message}`)
        
        setAlunni(prev => prev.filter(alunno => alunno.id !== id));
    }

    return (
        alunni && (alunni.map((alunno, i) => {
            return (
                <div key={i} className='border border-black flex flex justify-center items-center text-xl gap-5'>
                    <div>
                        <div>
                            Nome: {alunno.nome}
                        </div>
                        <div>
                            Cognome: {alunno.cognome}
                        </div>
                    </div>
                    <div className="text-sm flex gap-3">
                        <button
                            onClick={() => handleDelete(alunno.id)}
                            className="border border-black px-2 py-0.5 cursor-pointer"
                        >
                            Delete
                        </button>
                        <button className="border border-black px-2 py-0.5 cursor-pointer">
                            Update
                        </button>
                    </div>
                </div>
            );
        }))
    );
}

export default AlunniTable;
