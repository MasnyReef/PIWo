import { useState, useEffect, useContext, useReducer} from 'react';
import { UserContext } from "./UserContext";
import { CartProvider, cartReducer, initialCartState } from './CartReducer';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      setUser(foundUser);
    } else {
      console.log("Nieprawidłowy email lub hasło");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Logowanie</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="password">Hasło:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Zaloguj się</button>
    </form>
  );
}

const users = [
  { id: 1, firstName: "Jan", lastName: "Kowalski", email: "jan@example.com", password: "jan123" },
  { id: 2, firstName: "Anna", lastName: "Nowak", email: "anna@example.com", password: "anna456" },
  { id: 3, firstName: "Adam", lastName: "Szymański", email: "adam@example.com", password: "adam789" },
];


function App() {
  const [filtrMiasto, setFiltrMiasto] = useState("");
  const [filtrSypialnie, setFiltrSypialnie] = useState(0);
  const [filtrOpis, setFiltrOpis] = useState("");
  const [sortowanie, setSortowanie] = useState({
    kolumna: "cena",
    rosnaco: true
  });

  const [nieruchomosci, setNieruchomosci] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchNieruchomosci = async () => {
      const response = await fetch("/nieruchomosci.json");
      const data = await response.json();
      setNieruchomosci(data);
    };

    fetchNieruchomosci();
  }, []);

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

  // Obsługa wylogowania
  const handleLogout = () => {
    setUser(null);
  };

  // dodawanie do koszyka
  const handleAddToCart = (item) => {
    // Sprawdzenie, czy element już istnieje w koszyku
    const isItemInCart = cartState.cartItems.some((cartItem) => cartItem.id === item.id);
    if (!isItemInCart) {
      dispatch({ type: 'ADD_TO_CART', payload: item });
    } else {
      console.log('Element już znajduje się w koszyku.');
    }
  };

  // usuwanie z koszyka
  const handleRemoveFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  // pokazywanie/ukywanie koszyka
  const handleToggleCart = () => {
    setShowCart(!showCart);
    //console.log('Koszyk:', cartState.cartItems);
  };


  return (
    <div>
      {user ? (
        <div>
          <h2>Witaj, {user.firstName} {user.lastName}</h2>
          <button onClick={handleLogout}>Wyloguj się</button>
        </div>
      ) : (
        <LoginForm />
      )}
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
        
        {!showCart && (
        <div>
          <button onClick={handleToggleCart}>Pokaż koszyk</button>
          <ul>
            {przefiltrowaneNieruchomosci.map((nieruchomosc) => (
              <li key={nieruchomosc.id}>
              <h2>{nieruchomosc.miasto}</h2>
              <p>{nieruchomosc.adres}</p>
              <p>{nieruchomosc.cena} zł miesięcznie</p>
              <p>{nieruchomosc.opis}</p>
              <p>Ilość sypialni: {nieruchomosc.sypialnie}</p>
              <p>Data dodania: {nieruchomosc.dataDodania}</p>
              <p>Adres kontaktowy: {nieruchomosc.email}</p>
              <button onClick={() => handleAddToCart(nieruchomosc)}>Dodaj do koszyka</button>
            </li>
            ))}
          </ul>
        </div>
        )}

        {showCart && (
        <div>
          <h2>Koszyk</h2>
          <button onClick={handleToggleCart}>Schowaj koszyk</button>
          <ul>
            {cartState.cartItems.map((nieruchomosc) => (
              <li key={nieruchomosc.id}>
              <h2>{nieruchomosc.miasto}</h2>
              <p>{nieruchomosc.adres}</p>
              <p>{nieruchomosc.cena} zł miesięcznie</p>
              <p>{nieruchomosc.opis}</p>
              <p>Ilość sypialni: {nieruchomosc.sypialnie}</p>
              <p>Data dodania: {nieruchomosc.dataDodania}</p>
              <p>Adres kontaktowy: {nieruchomosc.email}</p>
              <button onClick={() => handleRemoveFromCart(nieruchomosc)}>Usuń z koszyka</button>
            </li>
            ))}
          </ul>
        </div>
        )}

      </div>
    </div>
      
  );
}
    
export default App;
