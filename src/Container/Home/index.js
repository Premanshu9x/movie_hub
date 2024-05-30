import React, { useEffect, useState } from 'react';
import CardComponent from '../../Components/CardComponent.js';
import Pagination from '../../Components/Pagination/index.js';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';

const Home = () => {

  const [content, setContent] = useState([]);
  const [pageno, setPageno] = useState(1)
  const [paginationno, setPaginationno] = useState(0)
  const KEY = process.env.REACT_APP_API_KEY;
  const img_300 = 'https://image.tmdb.org/t/p/original';

  const GetDataTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${KEY}&page=${pageno}`)
    setContent(data.results);
    setPaginationno(data.total_pages);
  }


  const handleClick = (number) => {
    setPageno(number);
  }

  useEffect(() => {
    console.log('Trending Component did mount');
    GetDataTrending();
  }, [pageno]);

  console.log(content);



  return (
    <div className='container-fluid home-container pb-3'>

      <div>
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={2}
          infiniteLoop={true}
          showStatus={false}
        >

          {
            content.map((item) => {
              return (
                <div className='position-relative'> 
                  <div className="posterImage">
                    <img src={img_300 + item.backdrop_path} alt="" />
                  </div>
                  <div className="posterImage__overlay text-white ms-5">
                    <div className="posterImage__title mb-3">{ item.original_title ? item.original_title: 'MOVIE'}</div>
                    <div className="posterImage__runtime fw-5">
                      { item.release_date}
                      <span className="posterImage__rating ms-5">
                        { parseInt(item.vote_average)}
                        <i className="fas fa-star" />{" "}
                      </span>
                    </div>
                    <div className="posterImage__description mt-3 mb-3">{ item.overview}</div>
                  </div>
                </div>
              )
            })
          }
        </Carousel>
      </div>

      <div className='text-center text-white p-3'>
        <h2>Top Trending</h2>
        <h3>TV and items For You</h3>
      </div>

      <div className='container d-flex justify-content-start gap-3 flex-wrap'>
        {
          content.map((item, index) => {
            return (
              <CardComponent data={item}></CardComponent>
            )
          })
        }
      </div>

      <div>
        <Pagination maxnum={paginationno} activenum={pageno} handleClick={handleClick}></Pagination>
      </div>

    </div>
  )
}

export default Home