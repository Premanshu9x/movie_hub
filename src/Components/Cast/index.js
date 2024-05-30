import React from 'react'

const Cast = ({ data }) => {
    const img_300 = 'https://image.tmdb.org/t/p/original';
    return (
        <div className="card mx-auto" style={{width:'13rem'}}>
            <img src={img_300+data.profile_path} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                </div>
        </div>
    )
}

export default Cast