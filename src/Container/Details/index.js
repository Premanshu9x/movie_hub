import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Cast from '../../Components/Cast';

const Details = () => {

  const params = useParams();
  const movie_id = params.movieid ;
  const movie_type = params.movietype;
  const img_200 = 'https://image.tmdb.org/t/p/w200';

  const KEY = process.env.REACT_APP_API_KEY;
  const [Content, setContent] = useState({});
  const [Genres, setGenres] = useState([]);
  const [Country, setCountry] = useState("");
  const [Video, setVideo] = useState("");
  const [Members, setMembers] = useState([]);
  const vote = parseInt(Content.vote_average);


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [deviceClass, setDeviceClass] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const breakpoint = 600; // Set your desired breakpoint
      const newDeviceClass = window.innerWidth <= breakpoint ? 'mobile' : 'laptop';
      setDeviceClass(newDeviceClass);
    };

    // Initial setup
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const fetchData = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${movie_type}/${movie_id}?api_key=${KEY}`);
    setContent(data);
    setGenres(data.genres);
    setCountry(data.production_countries[0].name);
  }

  const fetchVideo = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${movie_type}/${movie_id}/videos?api_key=${KEY}`);
    setVideo(data.results[0].key);
  }

  const fetchCast = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${movie_type}/${movie_id}/credits?api_key=${KEY}`);
    setMembers(data.cast);
  }

  useEffect(() => {
    fetchData();
    fetchVideo();
    fetchCast();
  }, []);

  console.log(Members);
  console.log(typeof Members[0]);
  return (
    <>
      <div className='container-fluid bg-dark text-light'>

        <div className='container row mx-auto pb-5'>
          <h1 className='mb-5 pt-5'>{Content.title}</h1>
          <div className='col-lg-6 col-sm-12'>
            <div className='row'>
              <div className='col-4 my-auto'><img src={img_200 + Content.poster_path} alt="" className='img-fluid rounded' /></div>
              <div className='col-8'>
                <div className='d-flex gap-2 mb-2'>
                  <span>⭐{vote}</span>
                  <span className='border px-1 rounded'>{Content.original_language}</span>
                  <span className='border px-1 rounded'>{Content.adult === false ? "10+" : "18+"}</span>
                </div>

                <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
                  <li className='d-flex justify-content-start flex-wrap gap-1'>Genre: {Genres.map((item, index) => {
                    return (
                      <span className=' text-danger' key={index}>{item.name}</span>
                    )
                  })}</li>

                  <li>Type: <span className='text-danger'>{movie_type}</span></li>
                  <li>Release Year: <span className='text-danger'>{Content.first_air_date || Content.release_date}</span></li>
                  <li>Budget: <span className='text-danger'>{Content.budget}</span></li>
                  <li>Country: <span className='text-danger'>{Country}</span></li>
                  <li className='Overview'>{Content.overview}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-sm-12 text-center my-auto'>
            <iframe className='trailer' src={`https://www.youtube.com/embed/${Video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>

        <div className='container mx-auto'>
          <h1 className='mb-5 pt-5'>Co-Stars Info</h1>
          <Carousel
            swipeable={true}
            draggable={true}
            responsive={responsive}
            infinite={true}
          >
            {
              Members.map((item, index) => {
                return (
                  <Cast key={index} data={item}></Cast>
                )
              })
            }
          </Carousel>


        </div>
      </div>
    </>
  )
}

export default Details