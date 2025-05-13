import { useState } from 'react';
import AlunniTable from '../components/AlunniTable';

const Home = () => {
    const [isPending, setIsPending] = useState(false);
    const [alunni, setAlunni] = useState(null);

    async function fetchAlunni() {
        setIsPending(true);

        const res = await fetch("http://localhost:8080/alunni", {
            method: "GET"
        }).then(res => res.json());

        if (!res.success) {
            console.error(`Error: ${res.message}`);
        }
        setAlunni(res.data);

        setIsPending(false);
    }

    return (
        <div className='px-12 space-y-12 py-12'>
            {
                alunni ? (
                    <AlunniTable alunni={alunni} setAlunni={setAlunni} />
                ) : (
                    <button
                        onClick={() => fetchAlunni()}
                        className='border border-black px-4 py-2 cursor-pointer'
                    >
                        {isPending ? "Loading.." : "Load students"}
                    </button>
                )
            }
        </div>
    );
}

export default Home;