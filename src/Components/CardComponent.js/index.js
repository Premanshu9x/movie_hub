import React from 'react'
import { Link } from 'react-router-dom'

const CardComponent = ({ data, mediaType }) => {
    const img_300 = 'https://image.tmdb.org/t/p/w300';
    const vote_average = parseInt(data.vote_average);
    const title = data.title || data.name;
    const release = data.first_air_date || data.release_date;
    const id = data.id;
    const media_type = data.media_type || mediaType;
    return (
        <Link to={`/details/${id}/${media_type}`} style={{textDecoration:'none', color:'inherit'}}>
            <div className='main-card py-2'>

                <div className='main-card-1'>
                    <img className='text-white card_image rounded' src={img_300 + data.poster_path} alt={data.title} />
                    <div className='movie_lang'>
                        <span className='p-1 bg-white'>{media_type}</span>
                        <span className='p-1 bg-dark text-white'>{data.original_language}</span>

                    </div>
                </div>


                <div className='d-flex justify-content-between' style={{fontSize:'0.9rem'}}>
                    <span className='text-danger'>Release</span>
                    <span className='text-light'>{release}</span>
                </div>
                <span className='text-light' style={{fontSize: '0.8rem', fontWeight: '700'}}>{title}</span>
            </div>
        </Link>
    )
}

export default CardComponent