import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export function One({ isOpen, setIsOpen, favourite, setFavourite, currpage, setcurrpage, currtext, setcurrtext, openSearchBar, setopenbar }) {
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("movie-app") || "[]");
    setFavourite(data); // ✅ array
  }, [setFavourite]);

  const handlefav = (movie) => {
    let olddata = JSON.parse(localStorage.getItem("movie-app") || "[]");
    if (olddata.some((m) => m.id === movie.id)) {
      olddata = olddata.filter((m) => m.id !== movie.id);
    } else {
      olddata.push(movie);
    }
    localStorage.setItem("movie-app", JSON.stringify(olddata));
    setFavourite(olddata);
  };

  return (
    <>
      <div className="over">
        <Link className="home" to={'/'} onClick={() => { setcurrtext(''); setcurrpage(1); window.scrollTo({ top: 0, behavior: "smooth" }); setopenbar(true); }} style={{ textDecoration: 'none' }}>
          <span id="sym-btn" className="material-symbols-outlined">home</span>
          <span className="label">HOME</span>
        </Link>

        <div className="fav">
          <button onClick={() => setIsOpen(!isOpen)}>
            <span id="symbols-btn" className="material-symbols-outlined">
              {isOpen ? "chevron_left" : "menu"}
            </span>
          </button>

          {isOpen && <span className="content">Favorites</span>}
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
              <span 
                className='material-symbols-outlined sidebar-remove-icon' 
                onClick={(e) => {  handlefav(m); }}
                title="Remove from favorites"
              >
                heart_broken
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default One;