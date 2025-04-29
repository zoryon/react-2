import React from 'react';

const SharedButton = (props) => {
    const { click, setClick } = props; 

    return (
        <>
            <button
                onClick={() => setClick(prev => prev + 1)}
                className='border border-black p-6'
            >
                Click me
            </button>

            <div>Hai cliccato {click} volte</div>
        </>
    );
}

export default SharedButton;