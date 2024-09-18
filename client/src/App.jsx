import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from 'axios';
import Header from './Component/Header'
import Footer from './Component/Footer'
import Home from './Pages/User/Home'
import Contact from './Pages/User/Contact'
import AmbulanceRouting from './Component/AmbulanceRouting/AmbulanceRouting';
import Login from './Pages/Login/Login'
import Register from "./Pages/Register/Register";
import About from "./Pages/About/About";
import UserContext from "./Context/UserContext";
import { useNavigate } from "react-router-dom";
import Hospital from "./Pages/Admin/Hospital";


function App() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const submitLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate('/login');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/example");
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
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          {user ? (
            <button onClick={submitLogout()}>Log out</button>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/call-ambulance" element={<AmbulanceRouting />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<Map />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
