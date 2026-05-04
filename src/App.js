import React, { useState, useEffect } from "react";
import One from "./Component/Fav";
import Second from "./Component/Auto";
import Navbar from "./Component/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const [favourite, setFavourite] = useState([]);
   const [currpage,setcurrpage]=useState(1);
    const [currtext,setcurrtext]=useState('');
const [openSearchBar,setopenbar]=useState(true);

  // ✅ Load favourites from localStorage on refresh
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("movie-app") || "[]");
    setFavourite(Array.isArray(data) ? data : []);
  }, []);

  return (
    <Router>
      <Navbar
       currtext={currtext}
        setcurrtext={setcurrtext}
        setopenbar={setopenbar} 
        setcurrpage={setcurrpage}/>

      <div className="container">
        {/* LEFT SIDEBAR */}
        <div className={`left ${isOpen ? "open" : "close"}`}>
          <One
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            favourite={favourite}
            setFavourite={setFavourite}
            currpage={currpage}
                  setcurrpage={setcurrpage}
                  currtext={currtext}
                  setcurrtext={setcurrtext}
                  openSearchBar={openSearchBar}
                  setopenbar={setopenbar}
                  
            
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="right">
          <Routes>
            <Route
              path="/"
              element={
                <Second
                  favourite={favourite}
                  setFavourite={setFavourite}
                  currpage={currpage}
                  setcurrpage={setcurrpage}
                  currtext={currtext}
                  setcurrtext={setcurrtext}
                  openSearchBar={openSearchBar}
                  setopenbar={setopenbar}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Layout;