import React, {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios';


const App = () => {
  const [searchInputTxt, setSearchInputTxt] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResipes = async () => {
      if(searchInputTxt.trim() === ""){
        setSearchResults([]);
        return;
      }

      try{
        const respoonse =  await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`);
        console.log(respoonse);
        if(respoonse.data.meals){
          setSearchResults(respoonse.data.meals);
          setError(null);
        }else{
          setSearchResults([]);
          setError("No Resipe Found");

        }
      }catch(error){
        console.error("Error fetching data:", error);
        setSearchResults([]);
        setError("Error fetching data. Please try again.");
      }
    }
    fetchResipes();
  }, [searchInputTxt])

  const handleInputChange = (e)=> {
    setSearchInputTxt(e.target.value);
  }
  return (
    <div>
      <h1>Food Search App</h1>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input type="text"  value={searchInputTxt} onChange={handleInputChange} />
        <button onClick={() =>setSearchInputTxt(searchInputTxt)}>Search</button>

      </form>
      {error && <p>{error}</p>}
      <div>
        {searchResults.map((meal) => (
         <div key={meal.idMeal}>
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
         </div>
        ))}
      </div>
    </div>
  )
}

export default App
