import React, { useState } from 'react';
import SharedButton from '../components/SharedButton';

const Test = () => {
    const [click, setClick] = useState(0);

    return (
        <div className='w-screen h-screen flex itemcs-center justify-center flex-col text-xl'>
            <SharedButton click={click} setClick={setClick} />
            <SharedButton click={click} setClick={setClick} />
            <SharedButton click={click} setClick={setClick} />
        </div>
    );
}

export default Test;