import "./App.css";
import { useState } from "react";
import AlunniTable from "./AlunniTable";

function App() {
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="App">
      {alunni.length > 0 && !loading ? (
        <AlunniTable alunni={alunni} caricaAlunni={caricaAlunni}/>
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
