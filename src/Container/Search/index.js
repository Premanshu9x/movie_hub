import React, { useEffect, useState } from 'react'
import CardComponent from '../../Components/CardComponent.js';
import Pagination from '../../Components/Pagination/index.js';
import axios from 'axios'

const Search = () => {

  const [content, setContent] = useState([]);
  const [selectedOption, setSelectedOption] = useState('movie');
  const [inputValue, setInputValue] = useState('crime');
  const [pageno, setPageno] = useState(1)
  const [paginationno, setPaginationno] = useState(0)
  const KEY = process.env.REACT_APP_API_KEY;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };



  const fetchSearch = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${selectedOption}?api_key=${KEY}&query=${inputValue}&page=${pageno}`);
    setContent(data.results);
    setPaginationno(data.total_pages);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSearch();
  };

  useEffect(() => {
    fetchSearch();
  }, [pageno])

  const handleClick = (number) => {
    setPageno(number);
  }

  return (
    <div className='Search pt-3 pb-3'>
      <div className=' text-white Radio mx-auto px-3 py-3'>
        <label className='px-3'>
          <input
            type="radio"
            value="movie"
            checked={selectedOption === 'movie'}
            onChange={handleOptionChange}
          />
          MOVIES
        </label>
        <label className='px-3'>
          <input

            type="radio"
            value="tv"
            checked={selectedOption === 'tv'}
            onChange={handleOptionChange}
          />
          TV
        </label>
      </div>
      <div className='pt-3'>
        <form onSubmit={handleSubmit} className="d-flex justify-content-center" role="search">
          <input className="form-control me-2 w-50" type="search" placeholder="Search" aria-label="Search" onChange={handleInputChange} />
          <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
      </div>

      <div className='container mt-5'>
        <div className=' d-flex justify-content-start gap-3 flex-wrap'>
          {
            content.map((item, index) => {
              return (
                <>
                  {
                    item.poster_path && <CardComponent key={index} data={item} mediaType={selectedOption}></CardComponent>
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

export default Search