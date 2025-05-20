import { useState } from "react";

export default function AlunniRiga(props) {
  const a = props.alunni;
  const caricaAlunni = props.caricaAlunni;
  const [modifica, setModifica] = useState(false);
  const [confermaElimina, setConfermaElimina] = useState(false);
  const [nome, setNome] = useState(a.nome);
  const [cognome, setCognome] = useState(a.cognome);

  async function eliminAlunno() {
    await fetch(`http://localhost:8080/alunni/${a.id}`, {
      method: "DELETE",
    });
    caricaAlunni();
  }

  async function modificAlunno() {
    await fetch(`http://localhost:8080/alunni/${a.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nome, cognome: cognome }),
    });
    setModifica(false);
    caricaAlunni();
  }

  return (
    <tr>
      <td>{a.id}</td>
      <td>{modifica ? <input value={nome} onChange={(e) => setNome(e.target.value)} /> : a.nome}</td>
      <td>{modifica ? <input value={cognome} onChange={(e) => setCognome(e.target.value)} /> : a.cognome}</td>
      <td>
        {confermaElimina ? (
          <div>
            Sei sicuro?
            <button onClick={eliminAlunno}>SI</button>
            <button onClick={() => setConfermaElimina(false)}>NO</button>
          </div>
        ) : (
          <button onClick={() => setConfermaElimina(true)}>Elimina</button>
        )}
      </td>
      <td>
        {modifica ? (
          <div>
            <button onClick={modificAlunno}>SALVA</button>
            <button onClick={() => setModifica(false)}>ANNULLA</button>
          </div>
        ) : (
          <button onClick={() => setModifica(true)}>Modifica</button>
        )}
      </td>
    </tr>
  );
}
