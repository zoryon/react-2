import React, { useEffect, useState } from 'react'

const Home = () => {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function get() {
            const res =  await fetch("http://localhost:8080/alunni", {
                method: "GET"
            }).then(res => res.json());

            if (!res.success) {
                console.error(`Error: ${res.message}`);
            }
            setData(res.data);
        }
        get();
    }, []);
    
    return (
        <div className='px-12 space-y-12 py-12'>
            {
                load ? (
                    data && (data.map((obj, i) => {
                        return (
                            <div className='border border-black flex flex-col justify-center items-center text-xl'>
                                <div>
                                    Nome: {obj.nome}
                                </div>
                                <div>
                                    Cognome: {obj.cognome}
                                </div>
                            </div>
                        );
                    }))
                ) : (
                    <button 
                        onClick={() => setLoad(prev => !prev)}
                        className='border border-black px-4 py-2 cursor-pointer'
                    >
                        Load students
                    </button>
                )
            }
            
        </div>
    );
}

export default Home;