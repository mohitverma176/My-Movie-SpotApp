import React from 'react'

function Card() {
  return (
   <div className="card-container text-center">
  <div className="search-row">
    <div className="search-bar-wrapper">
      <button className="material-symbols-outlined search-icon">search</button>
     <input className="search-input" placeholder="Search your movie..." type="text" />
    </div>
    <div className="entry-wrapper">
     <input className="entry-input" placeholder="Entry" type="number" />
    </div>
  </div>
</div>
  )
}

export default Card