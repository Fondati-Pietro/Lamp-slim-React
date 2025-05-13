import AlunniRiga from "./AlunniRiga";

export default function AlunniTable(props) {
  const alunni = props.alunni;
  const caricaAlunni = props.caricaAlunni;

  return (
    <table border="1">
      {alunni.map((a) => (
        <AlunniRiga alunni={a} caricaAlunni={caricaAlunni} />
      ))}
    </table>
  );
}
