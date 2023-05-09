import React, { useState } from "react";

// dane z przykładowymi nieruchomościami
const nieruchomosci = [
  {
    id: 1,
    miasto: "Kraków",
    sypialnie: 2,
    cena: 1500,
    opis: "Przestronne mieszkanie w centrum miasta",
    adres: "ul. Floriańska 15",
    lat: 50.061865,
    lng: 19.936319,
  },
  {
    id: 2,
    miasto: "Warszawa",
    sypialnie: 3,
    cena: 2200,
    opis: "Luksusowe mieszkanie z widokiem na miasto",
    adres: "ul. Marszałkowska 1",
    lat: 52.229676,
    lng: 21.012229,
  },
  {
    id: 3,
    miasto: "Gdańsk",
    sypialnie: 1,
    cena: 900,
    opis: "Nowoczesne studio w centrum starego miasta",
    adres: "ul. Długa 45",
    lat: 54.352025,
    lng: 18.646638,
  },
];

function App() {
  const [filtrMiasto, setFiltrMiasto] = useState("");
  const [filtrSypialnie, setFiltrSypialnie] = useState(0);
  const [filtrOpis, setFiltrOpis] = useState("");
  const [sortowanie, setSortowanie] = useState("cena");

  // funkcja do sortowania nieruchomości
  const posortowaneNieruchomosci = nieruchomosci.sort((a, b) =>
    sortowanie === "cena" ? a.cena - b.cena : a.id - b.id
  );

  // funkcja do filtrowania nieruchomości
  const przefiltrowaneNieruchomosci = posortowaneNieruchomosci.filter(
    (nieruchomosc) =>
      nieruchomosc.miasto.includes(filtrMiasto) &&
      (filtrSypialnie === 0 || nieruchomosc.sypialnie === filtrSypialnie) &&
      nieruchomosc.opis.includes(filtrOpis)
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
        <label       htmlFor="opis"
    >
      Opis:
    </label>
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
      value={sortowanie}
      onChange={(e) => setSortowanie(e.target.value)}
    >
      <option value="cena">Cenie</option>
      <option value="id">Dacie dodania</option>
    </select>
  </div>
  <ul>
    {przefiltrowaneNieruchomosci.map((nieruchomosc) => (
      <li key={nieruchomosc.id}>
        <div>{nieruchomosc.miasto}</div>
        <div>{nieruchomosc.sypialnie} sypialnie</div>
        <div>{nieruchomosc.cena} zł/mies.</div>
        <div>{nieruchomosc.opis}</div>
        <div>Adres: {nieruchomosc.adres}</div>
        <div>
          Współrzędne: ({nieruchomosc.lat}, {nieruchomosc.lng})
        </div>
      </li>
    ))}
  </ul>
</div>
);
}

export default App;
