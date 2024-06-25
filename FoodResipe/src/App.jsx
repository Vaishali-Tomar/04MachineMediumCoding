import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [searchInputTxt, setSearchInputTxt] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (searchInputTxt.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
        );
        if (response.data.meals) {
          setSearchResults(response.data.meals);
          console.log(response.data);
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

  const handleMealClick = async (mealId) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      setSelectedMeal(response.data.meals[0]);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="App">
      <h1>Food Search App</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter an ingredient or meal name..."
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
          <div
            key={meal.idMeal}
            className="meal"
            onClick={() => handleMealClick(meal.idMeal)}
          >
            <h2>{meal.strMeal}</h2>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
        ))}
      </div>

      {selectedMeal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{selectedMeal.strMeal}</h2>
            <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
            <h3>Ingredients</h3>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1).map(
                (index) =>
                  selectedMeal[`strIngredient${index}`] && (
                    <li key={index}>
                      {selectedMeal[`strIngredient${index}`]} -{" "}
                      {selectedMeal[`strMeasure${index}`]}
                    </li>
                  )
              )}
            </ul>
            <h3>Instructions</h3>
            <p>{selectedMeal.strInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
