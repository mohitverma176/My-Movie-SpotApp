import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";


export function One({ isOpen, setIsOpen, favourite, setFavourite, currpage, setcurrpage,currtext,setcurrtext, openSearchBar, setopenbar }) {
  console.log(favourite);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("movie-app") || "[]");
    setFavourite(data); // ✅ array
  }, []);


  return (
    <>
      <div className="over">
        {/* <Link to={`/page`}><img src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`}   alt={movieObj.title} className="card-img-top movies-img"/></Link> */}

        <Link className="home" to={'/'} onClick={() => {setcurrtext(''); setcurrpage(1); window.scrollTo({ top: 0, behavior: "smooth" });setopenbar(true);  }} style={{ textDecoration: 'none' }}>
          <span id="sym-btn" className="material-symbols-outlined">home</span>
          <span className="label">HOME</span>
        </Link>

        <div className="fav">
          <button onClick={() => setIsOpen(!isOpen)}>
            <span id="symbols-btn" className="material-symbols-outlined">
              {isOpen ? "chevron_left" : "menu"}
            </span>
          </button>

          {isOpen && <span className="content">slide content</span>}
        </div>

        <div className="fav-shows">
          {favourite.map((m) => (
            <div key={m.id} className="fav-item">
              <img
                src={m?.poster_path ? `https://image.tmdb.org/t/p/original${m.poster_path}` : "https://via.placeholder.com/150x225?text=No+Image"}
                className="fav-img"
                alt={m?.title}
              />
              <span className="label fav-title">{m.title}</span>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default One;