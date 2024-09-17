import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import About from './Pages/About/About'
import Mapbox from './Component/mapbox';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/example');
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/About" element={<About />} />
        <Route path="/" element={<Mapbox />} />
      </Routes>
    </div>
  );
}

export default App;
