import React,{useState, useEffect} from 'react';
import './style.css';
import Axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get')
    .then((response)=>{
      setMovieList(response.data)
      })
  },[])
  const submitReview =()=>{
    Axios.post('http://localhost:3001/api/insert', 
    {movieName: movieName, movieReview:review})
    .then(()=>{
      alert("success");
    });
  }

  return (
    <div className="App">
      <div>hello</div>
      <input type="text" name="name" onChange={(e)=>{
        setMovieName(e.target.value)
      }}/>
      <input type="text" name="name" onChange={(e)=>{
        setReview(e.target.value)
      }}/>
      <button onClick={submitReview}>submit</button>
      {movieReviewList.map((val)=>{
        return <h1>MovieName:{val.movieName} | Movie Review: {val.movieReview}</h1>
      })}
    </div>
  );
}

export default App;
