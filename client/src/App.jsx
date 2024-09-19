import { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
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
import TextContext from "./Context/TextContext";
import ImageContext from "./Context/ImageContext";
import VideoContext from "./Context/VideoContext";
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
import Mapbox from "./Test/Mapbox";


function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchText = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-text");
      setTexts(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const fetchImage = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-image");
      setImages(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const fetchVideo = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-video");
      setVideos(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchText();
    fetchImage();
    fetchVideo();
  }, []);

  useEffect(() => {
    console.log("Error: ", error);
  }, [error]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const isAdmin = user && user.role === "admin";
  const isCustomer = user && user.role === "customer";
  const isDriver = user && user.role === "driver";
  const isEMT = user && user.role === "emt";

  return (
    <div className="App">
      <VideoContext.Provider value={{ videos, setVideos }}>
        <ImageContext.Provider value={{ images, setImages }}>
          <TextContext.Provider value={{ texts, setTexts }}>
            <UserContext.Provider value={{ user, setUser }}>
              {isAdmin ? <AdminHeader /> : <Header />}
              <div className={isAdmin ? "d-flex" : ""}>
                {isAdmin && <AdminSidebar />}
                <Routes>
                  {!user ? (
                    <>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/" element={<Home />} />
                      <Route path="/contact" element={<Contact />} />
                    </>
                  ) : isAdmin ? (
                    <>
                      <Route
                        path="/admin-dashboard"
                        element={<AdminDashboard />}
                      />
                      <Route path="/admin-driver" element={<AdminDriver />} />
                      <Route path="/admin-image" element={<AdminImage />} />
                      <Route
                        path="/admin-hospital"
                        element={<AdminHospital />}
                      />
                      <Route path="/admin-video" element={<AdminVideo />} />
                      <Route path="/admin-text" element={<AdminText />} />
                      <Route path="/admin-user" element={<AdminUser />} />
                      <Route
                        path="/admin-ambulance-car"
                        element={<AdminAmbulanceCar />}
                      />
                      {/* Route fallback */}
                      <Route
                        path="*"
                        element={<Navigate to="/admin-dashboard" />}
                      />
                    </>
                  ) : (
                    <>
                      <Route path="/" element={<Home />} />
                      <Route path="/contact" element={<Contact />} />
                    </>
                  )}
                  <Route path="/map" element={<Map />} />
                  <Route
                    path="/call-ambulance"
                    element={<AmbulanceRouting />}
                  />
                  <Route path="/about" element={<About />} />
                </Routes>
              </div>
              <Footer />
            </UserContext.Provider>
          </TextContext.Provider>
        </ImageContext.Provider>
      </VideoContext.Provider>
    </div>
  );
}

export default App;
