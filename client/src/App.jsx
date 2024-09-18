import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import About from './Pages/About/About'
import axios from 'axios';
import Header from './Component/Header'
import Footer from './Component/Footer'
import Home from './Pages/User/Home'
import Contact from './Pages/User/Contact'
import AmbulanceRouting from './Component/AmbulanceRouting/AmbulanceRouting';

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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/map" element={<AmbulanceRouting />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
