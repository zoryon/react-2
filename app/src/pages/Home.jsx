import React, { useEffect, useState } from 'react'

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function get() {
            const res =  await fetch("http://localhost:8080/alunni", {
                method: "GET"
            }).then(res => res.json());

            setData(res);
        }
        get();
    }, []);
    
    return (
        <div className='px-12 space-y-12 py-12'>
            {data && (data.map((obj, i) => {
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
            }))}
        </div>
    );
}

export default Home;