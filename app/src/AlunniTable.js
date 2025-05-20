import AlunniRiga from "./AlunniRiga";

export default function AlunniTable(props) {
  const alunni = props.alunni;
  const caricaAlunni = props.caricaAlunni;

  return (
    <table border="1">
      <tbody>
        {alunni.map((a) => (
          <AlunniRiga alunni={a} key={a.id} caricaAlunni={caricaAlunni} />
        ))}
      </tbody>
    </table>
  );
}
