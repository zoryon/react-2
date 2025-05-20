import { useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUserPage = () => {
    const [name, setName] = useState("");
    const [surname, setSurame] = useState("");
    
    const { id } = useParams();

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("http://localhost:8080/alunni/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                nome: name,
                cognome: surname,
            }),
        }).then(res => res.json());

        if (res.success) {
            window.location.href = "/";
        } else {
            console.error(res.message);
        }
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} className="w-[40%]" method="POST">
                <div className="flex flex-col items-start">
                    <label htmlFor="name">Nome</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="w-full border"
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                </div>

                <div className="flex flex-col items-start">
                    <label htmlFor="surname">Cognome</label>
                    <input
                        id="surname"
                        name="surname"
                        type="text"
                        className="w-full border"
                        onChange={(e) => setSurame(e.currentTarget.value)}
                    />
                </div>

                <button type="submit" className="border px-6 py-1.5 mt-5">Send</button>
            </form>
        </div>
    );
}

export default UpdateUserPage;