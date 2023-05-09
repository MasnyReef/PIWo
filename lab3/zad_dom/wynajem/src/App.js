import React, { useState } from "react";

// dane z przykładowymi nieruchomościami
const nieruchomosci = [
  {
    id: 1,
    miasto: "Kraków",
    sypialnie: 2,
    cena: 2500,
    opis: "Nowoczesne mieszkanie w centrum Krakowa",
    adres: "ul. Floriańska 15",
    dataDodania: "2023-01-01",
    },
    {
    id: 2,
    miasto: "Warszawa",
    sypialnie: 3,
    cena: 3500,
    opis: "Duże mieszkanie blisko centrum Warszawy",
    adres: "ul. Marszałkowska 1",
    dataDodania: "2023-01-05",
    },
    {
    id: 3,
    miasto: "Gdańsk",
    sypialnie: 1,
    cena: 1800,
    opis: "Kawalerka w samym centrum Gdańska",
    adres: "ul. Długa 1",
    dataDodania: "2023-01-10",
    },
    {
    id: 4,
    miasto: "Kraków",
    sypialnie: 1,
    cena: 1500,
    opis: "Przytulna kawalerka w spokojnej okolicy Krakowa",
    adres: "ul. Zakopiańska 1",
    dataDodania: "2023-02-01",
    },
    {
    id: 5,
    miasto: "Warszawa",
    sypialnie: 2,
    cena: 2800,
    opis: "Mieszkanie z pięknym widokiem na Stadion Narodowy",
    adres: "ul. Wybrzeże Gdyńskie 4",
    dataDodania: "2023-02-15",
    },
    {
    id: 6,
    miasto: "Białystok",
    sypialnie: 1,
    cena: 200,
    opis: "Mieszkanie w pakiecie z lokatorem (UWAGA: lepiej chować przed nim mleko!)",
    adres: "ul. Szkolna 17",
    dataDodania: "2023-03-01",
    },
];

function App() {
  const [filtrMiasto, setFiltrMiasto] = useState("");
  const [filtrSypialnie, setFiltrSypialnie] = useState(0);
  const [filtrOpis, setFiltrOpis] = useState("");
  const [sortowanie, setSortowanie] = useState({
    kolumna: "cena",
    rosnaco: true
  });

  // funkcja do sortowania nieruchomości
  const posortowaneNieruchomosci = nieruchomosci
    .slice()
    .sort((a, b) =>
      sortowanie.kolumna === "cena"
        ? a.cena - b.cena
        : new Date(a.dataDodania) - new Date(b.dataDodania)
    );
  if (!sortowanie.rosnaco) {
    posortowaneNieruchomosci.reverse();
  }

  // funkcja do filtrowania nieruchomości
  const przefiltrowaneNieruchomosci = posortowaneNieruchomosci.filter(
    (nieruchomosc) =>
    nieruchomosc.miasto.toLowerCase().includes(filtrMiasto.toLowerCase()) &&
    (filtrSypialnie === 0 || nieruchomosc.sypialnie === filtrSypialnie) &&
    nieruchomosc.opis.toLowerCase().includes(filtrOpis.toLowerCase())
);


  return (
    <div>
      <h1>Wynajem nieruchomości</h1>
      <div>
        <label htmlFor="miasto">Miasto:</label>
        <input
          type="text"
          id="miasto"
          value={filtrMiasto}
          onChange={(e) => setFiltrMiasto(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="sypialnie">Ilość sypialni:</label>
        <select
          id="sypialnie"
          value={filtrSypialnie}
          onChange={(e) => setFiltrSypialnie(parseInt(e.target.value))}
        >
          <option value={0}>Dowolna</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
      <div>
        <label htmlFor="opis">Opis:</label>
        <input
          type="text"
          id="opis"
          value={filtrOpis}
          onChange={(e) => setFiltrOpis(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="sortowanie">Sortuj po:</label>
        <select
          id="sortowanie"
          value={sortowanie.kolumna}
          onChange={(e) =>
            setSortowanie({
              kolumna: e.target.value,
              rosnaco: sortowanie.kolumna === e.target.value ? !sortowanie.rosnaco : true
            })
          }
        >
          <option value="cena">Cenie</option>
          <option value="dataDodania">Dacie dodania</option>
        </select>
        <button onClick={() => setSortowanie({...sortowanie, rosnaco: !sortowanie.rosnaco})}>
          {sortowanie.rosnaco ? "Malejąco" : "Rosnąco"}
        </button>
      </div>
      <ul>
      {przefiltrowaneNieruchomosci.map((nieruchomosc) => (
              <li key={nieruchomosc.id}>
              <h2>{nieruchomosc.miasto}</h2>
              <p>{nieruchomosc.adres}</p>
              <p>{nieruchomosc.cena} zł miesięcznie</p>
              <p>{nieruchomosc.opis}</p>
              <p>Ilość sypialni: {nieruchomosc.sypialnie}</p>
              <p>Data dodania: {nieruchomosc.dataDodania}</p>
            </li>
          ))}
        </ul>
      </div>
      
  );
}
    
export default App;
