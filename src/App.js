import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/movies");
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
