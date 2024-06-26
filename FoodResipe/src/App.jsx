import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [searchInputTxt, setSearchInputTxt] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (searchInputTxt.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`
        );
        if (response.data.meals) {
          setSearchResults(response.data.meals);
          setError(null);
        } else {
          setSearchResults([]);
          setError("No recipes found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setSearchResults([]);
        setError("Error fetching data. Please try again.");
      }
    };

    fetchRecipes();
  }, [searchInputTxt]);

  const handleInputChange = (e) => {
    setSearchInputTxt(e.target.value);
  };

  return (
    <div className="App">
      <h1>Food Search App</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter a meal name..."
          value={searchInputTxt}
          onChange={handleInputChange}
        />
        <button onClick={() => setSearchInputTxt(searchInputTxt)}>
          Search
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="search-results">
        {searchResults.map((meal) => (
          <div key={meal.idMeal} className="meal">
            <h2>{meal.strMeal}</h2>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
