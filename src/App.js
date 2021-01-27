import React,{useState, useEffect} from 'react';
import './style.css';
import Axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview]=useState('');

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get')
    .then((response)=>{
      setMovieList(response.data)
      })
  },[])
  const submitReview =()=>{
    Axios.post('http://localhost:3001/api/insert', 
    {movieName: movieName, movieReview:review});

    //update newly added list
    setMovieList([...movieReviewList, {movieName:movieName, movieReview:review}])
    };
  const deleteReview=(movie)=>{
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  }
  const updateReview=(movie)=>{
    Axios.put('http://localhost:3001/api/update',{movieName:movie, movieReview:newReview});
    setNewReview("")
  }

  return (
    <div className="App">
      <div>hello</div>
      <input type="text" name="name" onChange={(e)=>{
        setMovieName(e.target.value)
      }}/>
      <p><input type="text" name="name" onChange={(e)=>{
        setReview(e.target.value)
      }}/></p>
      <button onClick={submitReview}>submit</button>
      {movieReviewList.map((val)=>{
        return (
        <div>
          <h1>MovieName:{val.movieName} | Movie Review: {val.movieReview}</h1>
          <p><button onClick={()=>{deleteReview(val.movieName)}}>delete</button></p>
          <input type="text" onChange={(e)=>{
            setNewReview(e.target.value)
          }}/>
          <button onClick={()=>{updateReview(val.movieName)}}>update</button>
        </div>
      )})}
    </div>
  );
}

export default App;
