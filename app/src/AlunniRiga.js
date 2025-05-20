import { useState } from "react";

export default function AlunniRiga(props) {
  const a = props.alunni;
  const caricaAlunni = props.caricaAlunni;
  const [modifica, setModifica] = useState(false);
  const [confermaElimina, setConfermaElimina] = useState(false);
  const [confermaModifica, setConfermaModifica] = useState(false);

  async function eliminAlunno() {
    const data = await fetch(`http://localhost:8080/alunni/${a.id}`, {
      method: "delete",
    });
    caricaAlunni();
  }

  function insModifiche() {
    <div>
      <div>
        <h5>nome : </h5>
        <input onChange={(e) => a.setNome(e.target.value)} type="text"></input>
        <h5>cognome : </h5>
        <input onChange={(e) => a.setCognome(e.target.value)} type="text"></input>
        <br />
        <button onClick={modificAlunno}>SALVA</button>
        <br />
        <button onClick={() => setModifica(false)}>ANNULLA</button>
      </div>
    </div>
  }

  async function modificAlunno(){
    const data = await fetch(`http://localhost:8080/alunni/${a.id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: a.nome, cognome: a.cognome }),
    });
    caricaAlunni();
  }

  return (
    <tr>
      <td>{a.id}</td>
      <td>{a.nome}</td>
      <td>{a.cognome}</td>
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
        {confermaModifica ? (
          <div>
            Sei sicuro?
            <button onClick={insModifiche}>SI</button>
            <button onClick={() => setConfermaModifica(false)}>NO</button>
          </div>
        ) : (
          <button onClick={() => setConfermaModifica(true)}>Modifica</button>
        )}
      </td>
    </tr>
  );
}
