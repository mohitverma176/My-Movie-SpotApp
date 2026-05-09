import React ,{useEffect, useState} from 'react'
import axios from 'axios';
export default function Auto({ favourite, setFavourite,currpage,setcurrpage, currtext, setcurrtext, openSearchBar, setopenbar}) {
  const [movie,setmovie]=useState([]);
  const [index,setintex]=useState(0);
 let  [page,setpage]=useState([1]);
 const [selectmovie,setselectmovie]=useState(null);
 setopenbar(currtext===''?true:false);

 useEffect(()=>{
  const hour=new Date().getHours();
  let greeting;
   if (hour >= 5 && hour < 12) {
    greeting = "Good Morning 🌅";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon ☀️";
  } else  {
    greeting = "Good Evening 🌙";
  }
  alert(greeting);
 },[]);

  let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
//  console.log(currtext);
 let filtarr=[];
   useEffect(() => {
    const fetchData = async () => {
      try {
        let mainPageUrl =
        openSearchBar === true
          ? `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${currpage}`
          : `https://api.themoviedb.org/3/search/movie?query=${currtext}&api_key=5540e483a20e0b20354dabc2d66a31c9&page=${currpage}`;
        const res = await axios.get(mainPageUrl);
        
        // Data(res.data);
          document.querySelector('.trending-container')?.scrollTo({ top: 0, behavior: "smooth" }); 
        setmovie(res.data.results);       
     
      } catch (error) {
        console.log(error);
      }    };
    fetchData();
  }, [currpage, currtext, openSearchBar]);

  useEffect(()=>{ 
      if (movie.length === 0) return;
      const interval=setInterval(()=>{
       setintex((prev)=> (prev + 1) % movie.length); 
  },4000) // 4 seconds is a better viewing interval
  return ()=> clearInterval(interval);
    },[movie]);
     
  let previouspage=()=>{
    if(currpage!==1){
      setcurrpage((prev)=> prev-1);
    }

  }

  let nextpage=()=>{
    let temp=[];
    for(let i=1;i<=page.length+1;i++){
      temp.push(i);
    }
    // console.log(page);
    setpage([...temp])
    // console.log(page);
    setcurrpage((prev)=>prev+1);
  }
 
 const thatpage = (pageNo) => {
  setcurrpage(pageNo);
};


if(currtext===''){
  filtarr=[...movie];
}
else{
  filtarr=movie.filter((movieObj)=>{
     let title=movieObj.title.toLowerCase(); 
     return title.includes(currtext.toLowerCase())
  })
}

const overallpage=(m)=>{
  setselectmovie(m);
}


const handlefav=(movie)=>{
  let olddata=JSON.parse(localStorage.getItem("movie-app")||"[]");
  if(olddata.some((m)=>m.id===movie.id)){
    olddata=olddata.filter((m)=>m.id!==movie.id);
  }
  else{
    olddata.push(movie);
  }
  localStorage.setItem("movie-app",JSON.stringify(olddata));
  setFavourite(olddata)

}
 
  return (
    <div className="trending-container">
      <h1 className="trending-title">Trending Now</h1>
      
      <div className="movie-img">
        {movie.length > 0 && movie[index] &&
          <><img 
            src={`https://image.tmdb.org/t/p/original${filtarr[index]?.backdrop_path}`} 
            alt={filtarr[index]?.title} 
          />
          <h1 className='movie-tittle'>{filtarr[index]?.title}</h1>
          <h4 className='movie-view'>{filtarr[index]?.overview}</h4>
         </>
        }    
      </div>

      
      <div className="movies-grid-container">
        <h2 className="grid-title">Popular Movies</h2>
        <div className="movies-grid">

          {selectmovie && (
  <div
    className="overallpage-container"
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${selectmovie.backdrop_path})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white"
    }}
  >
     <button className='material-symbols-outlined genre-button-1' style={{position:'absolute',top:'10px',right:'10px'}} onClick={() => setselectmovie(null)}>
          Close
        </button>
    <div
      style={{display: "flex",gap: "30px",background: "rgba(0,0,0,0.7)",padding: "20px",borderRadius: "10px",maxWidth: "1000px",margin: "0 auto"
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${selectmovie.poster_path}`}
        alt={selectmovie.title}
        style={{ height: "300px", borderRadius: "10px" }}
      />

      <div>
        <h2>{selectmovie.title}</h2>
        {/* <p className='genre-button'>{genreids[selectmovie.genre_ids[0]]} {genreids[selectmovie.genre_ids[1]]} {genreids[selectmovie.genre_ids[2]]} </p> */}
        
         { selectmovie.genre_ids.map((id)=>(
            <span className='genre-button-2' key={id}>{genreids[id]}</span>
        ))}
          
        <p style={{marginTop: "10px",color: "#e5e7eb",fontSize: "15px",lineHeight: "1.6" }}> <bold><strong>Overview:</strong></bold>   {selectmovie.overview}</p>

      </div>
    </div>
  </div>
)}

          {filtarr.map((m) => (
            <div key={m.id} className="movie-card" >
              <div className="movie-card-img-wrapper"   >
                <img 
                  src={`https://image.tmdb.org/t/p/original${m.poster_path}`} 
                  alt={m.title} 
                  className="movie-card-img" 
                  onClick={()=>overallpage(m)}
                />
                <div className="movie-card-overlay">
                  {/* Hardcoded star text in span since Material symbols may need to be imported or use a simple HTML star */}
                  <span style={{ color: '#fbbf24' }}>★</span>
                  <span>{m.vote_average?.toFixed(1)}</span>
                </div>
              </div>
              <div className="movie-card-info">
                <h3 className="movie-card-title">{m.title}</h3>
                <div style={{ display: "flex", gap: "8px" }}>
                <span className='genre-button' >{genreids[m.genre_ids[0]]}</span> <span className='genre-button'> {genreids[m.genre_ids[1]]}  </span>
                </div>
                <p className="movie-card-date">{m.release_date?.substring(0, 4)}</p>
              </div>
              <div className='button-wrapper' style={{display:'flex',width:'100%',justifyContent:'center'}}>
                <a href='#' className='material-symbols-outlined fav-icon' onClick={()=>handlefav(m)}>{favourite.some((fav) => fav.id === m.id) ?"favorite":"heart_broken"}</a>
                </div> 
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'center'}}>
            <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" onClick={previouspage} href='#'>Previous</a></li>
         { page.map((p)=>(
            <li key={p} class="page-item"><a className="page-link" href="#"  style={{background: currpage === p ? "red" : "white"}} onClick={()=>thatpage(p)}>{p}</a></li>
          ))}
          <li class="page-item"><a class="page-link" onClick={nextpage} href='#'>Next</a></li>
        </ul>
      </nav>
    </div>
    </div>
  )
}
