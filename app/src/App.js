import "./App.css";
import { use, useState } from "react";
import AlunniTable from "./AlunniTable";

function App() {
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inserisci, setInserisci] = useState(false);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [cognomErr, setCognomErr] = useState("");
  const [nomErr, setNomErr] = useState("");

  async function caricaAlunni() {
    /*
    fetch("http://localhost:8080/alunni", { method: "GET" }).then((data) => {
      data.json().then((myData) => {
        setAlunni(myData);
      });
    });   Per operazioni non asincrone
    */

    // per operazioni asincrone
    setLoading(true);
    const data = await fetch("http://localhost:8080/alunni", { method: "GET" });
    const myData = await data.json();
    setLoading(false);
    setAlunni(myData);
  }

  //curl -X POST http://localhost:8080/alunni -H "Content-Type: application/json" -d '{"nome": "Capponi", "cognome": "Lillo"}'
  async function salvAlunni() {
    if(nome === "" || cognome === ""){
      setNomErr("Nome Obbligatorio");
      <br />
      setCognomErr("Cognome Obbligatorio");
      return;
    }
    const data = await fetch("http://localhost:8080/alunni", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nome, cognome: cognome }),
    });
    setNome();
    setCognome();
    caricaAlunni();
  }

  //aggiungi valore che scatena l'evento alla textbox
  return (
    <div className="App">
      {alunni.length > 0 && !loading ? (
        <div>
          <AlunniTable alunni={alunni} caricaAlunni={caricaAlunni} />
          {inserisci ? (
            <div>
              <h5>nome : </h5> <input onChange={(e) => setNome(e.target.value)} type="text"></input> 
              {nomErr !== ""&& nomErr}
              <h5>cognome : </h5> <input onChange={(e) => setCognome(e.target.value)} type="text"></input>
              {cognomErr !== ""&& cognomErr}
              <br />
              <button onClick={salvAlunni}>SALVA</button>
              <br />
              <button onClick={() => setInserisci(false)}>ANNULLA</button>
            </div>
          ) : (
            <button onClick={() => setInserisci(true)}>
              Inserisci nuovo alunno
            </button>
          )}
        </div>
      ) : (
        <>
          {loading ? (
            <div> Caricamento in corso </div>
          ) : (
            <button onClick={caricaAlunni}>Carica alunni</button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
