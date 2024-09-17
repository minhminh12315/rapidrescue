import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import axios from 'axios';
import Header from './Pages/User/Header'
import Footer from './Pages/User/Footer'
import Home from './Pages/User/Home'
import About from './Pages/User/About'
import Contact from './Pages/User/Contact'

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
        <Route path='/about' element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
