import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Home from "./Pages/User/Home";
import Contact from "./Pages/User/Contact";
import AmbulanceRouting from "./Component/AmbulanceRouting/AmbulanceRouting";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import About from "./Pages/About/About";
import UserContext from "./Context/UserContext";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./Pages/Admin/AdminHeader";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminHospital from "./Pages/Admin/AdminHospital";
import AdminDriver from "./Pages/Admin/AdminDriver";
import AdminImage from "./Pages/Admin/AdminImage";
import AdminAmbulanceCar from "./Pages/Admin/AdminAmbulanceCar";
import AdminVideo from "./Pages/Admin/AdminVideo";
import AdminText from "./Pages/Admin/AdminText";
import AdminUser from "./Pages/Admin/AdminUser";
import AdminSidebar from "./Pages/Admin/AdminSidebar";
import Map from "./Component/Map/Map";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
<<<<<<< HEAD
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
        </Routes>
=======
        {user && user.role === "admin" ? <AdminHeader /> : <Header />}
        <div className={user && user.role === "admin" ? "d-flex" : ""}>
          {user && user.role === "admin" && <AdminSidebar />}
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />

            {!user ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            ) : (
              user.role === "admin" && (
                <>
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/admin-driver" element={<AdminDriver />} />
                  <Route path="/admin-image" element={<AdminImage />} />
                  <Route path="/admin-hospital" element={<AdminHospital />} />
                  <Route path="/admin-video" element={<AdminVideo />} />
                  <Route path="/admin-text" element={<AdminText />} />
                  <Route path="/admin-user" element={<AdminUser />} />
                  <Route
                    path="/admin-ambulance-car"
                    element={<AdminAmbulanceCar />}
                  />
                </>
              )
            )}
            <Route path="/map" element={<Map />} />

            <Route path="/call-ambulance" element={<AmbulanceRouting />} />
          </Routes>
        </div>
>>>>>>> 6cb9845415c700fea938bf5c4471816e4c5dff00
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
