import { useState } from "react";

export default function AlunniRiga(props) {
  const a = props.alunni;
  const caricaAlunni = props.caricaAlunni;
  const [conferma, setConferma] = useState(false);
  const [cancellato, setCancellato] = useState(false);

  async function eliminAlunno() {
    const data = await fetch(`http://localhost:8080/alunni/${a.id}`, {
      method: "delete",
    });
    caricaAlunni();
  }

  return (
    <tr>
      <td>{a.id}</td>
      <td>{a.nome}</td>
      <td>{a.cognome}</td>
      <td>
        {conferma ? (
          <div>
            Sei sicuro?
            <button onClick={eliminAlunno}>SI</button>
            <button onClick={() => setConferma(false)}>NO</button>
          </div>
        ) : (
          <button onClick={() => setConferma(true)}>Elimina</button>
        )}
      </td>
    </tr>
  );
}
