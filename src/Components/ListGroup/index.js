import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ListGroup = ({Genres, setGenres, selectedGenres, setSelectedGenres, type}) => {
    const KEY = process.env.REACT_APP_API_KEY;

    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${KEY}`);
        setGenres(data.genres);
    }

    useEffect(()=>{
        fetchGenres();
        
    }, []);

    const handleAdd = (genre)=>{
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(Genres.filter((g)=> g.id != genre.id));
    }

    const handleremove = (genre)=>{
        setGenres([...Genres, genre]);
        setSelectedGenres((selectedGenres.filter((g)=>g.id != genre.id)));
    }

    return (
        <div className='container d-flex justify-content-center gap-2 flex-wrap mt-3 mb-3'>
            {
                selectedGenres.map((item, index) => {
                    return (
                        <span onClick={()=> handleremove(item)} key={item.id} className='FilterSpanCross px-2'>{item.name} <i  className="fa-solid fa-xmark ms-2"></i></span>
                    )
                })
            }
            {
                Genres.map((item, index) => {
                    return (
                        <span onClick={()=> handleAdd(item)} key={item.id} className='FilterSpan px-2'>{item.name}</span>
                    )
                })
            }
        </div>
    )
}

export default ListGroup