import React, { useState } from "react";
import OfferList from "./components/OfferList";
import { FaSun, FaMoon } from "react-icons/fa"; // Importerar ikoner från react-icons

function getWeek(date) {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startDate.getDay() + 1) / 7);
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark Mode som standard
  const currentWeek = getWeek(new Date());

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="banner">
        <h1 className="banner-logo">
          Wi<span className="logo-red">LL</span>Y:S
        </h1>
        <p className="banner-week">Erbjudanden sorterat efter störst rabatt <br />
        Vecka {currentWeek}</p>
        <button className="theme-switch" onClick={toggleTheme}>
          {isDarkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
        </button>
      </header>
      <OfferList />
    </div>
  );
}

export default App;
