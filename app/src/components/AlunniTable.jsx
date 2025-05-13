import AlunniRow from "./AlunniRow";

const AlunniTable = (props) => {
    const { alunni, setAlunni } = props;

    return (
        alunni && (alunni.map((alunno, i) => {
            return <AlunniRow key={alunno.id + i} alunno={alunno} setAlunni={setAlunni} />;
        }))
    );
}

export default AlunniTable;
