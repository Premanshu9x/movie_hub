import React, { useEffect, useState } from 'react'
import ListGroup from '../../Components/ListGroup'
import CardComponent from '../../Components/CardComponent.js';
import axios from 'axios';
import useGenres from '../../Hooks/useGenres.js'
import Pagination from '../../Components/Pagination/index.js';

const TVSeries = () => {

  const [content, setContent] = useState([]);
  const [Genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [pageno, setPageno] = useState(1)
  const [paginationno, setPaginationno] = useState(0)
  const KEY = process.env.REACT_APP_API_KEY;
  const genreForUrl = useGenres(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${KEY}&with_genres=${genreForUrl}&page=${pageno}`);
    setContent(data.results);
    setPaginationno(data.total_pages);

  }

  useEffect(() => {
    fetchMovies();
  }, [genreForUrl, pageno]);

  const handleClick = (number) => {
    setPageno(number);
  }


  return (
    <div className='container-fluid MoviesList pb-3'>
      <div className='text-center pb-3 text-light'>
        <h1>Top Trending TV Series</h1>
        <h3>For You</h3>
      </div>

      <ListGroup Genres={Genres} setGenres={setGenres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} type='tv'></ListGroup>

      <div className='container'>
        <div className=' d-flex justify-content-start gap-3 flex-wrap'>
          {
            content.map((item, index) => {
              return (
                <>
                {
                  item.poster_path && <CardComponent key={index} data={item} mediaType='tv'></CardComponent>
                }
                </>
              )
            })
          }
        </div>
      </div>

      <div>
        <Pagination maxnum={paginationno} activenum={pageno} handleClick={handleClick}></Pagination>
      </div>
    </div>
  )
}

export default TVSeries