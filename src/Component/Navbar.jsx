import React from 'react'

function Navbar({ currtext, setcurrtext, setopenbar,setcurrpage }) {
  return (
    <div className="navbar-container">
       <h1 className="navbar-brand" onClick={()=>setcurrpage(1)}>MOVIES APP</h1>
       
       <div className="card-container text-center" style={{marginLeft:'350px'}}>
         <div className="search-row">
           <div className="search-bar-wrapper">
             <button className="material-symbols-outlined search-icon">search</button>
             <input className="search-input" placeholder="Search your movie..." type="text" value={currtext} onChange={(e)=>{setcurrtext(e.target.value); setopenbar(false); }} />
           </div>
         </div>
       </div>

       <span className='user'
         style={{
            width:'45px',
            height:'45px',
            borderRadius:'50%',
            background:'rgba(16, 185, 129, 0.8)',
            color:'white',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
            flexShrink: 0,
            boxShadow: "0 4px 10px rgba(16, 185, 129, 0.3)",
            cursor: "pointer"
         }}
        >M</span>
    </div>
    
  )
}

export default Navbar