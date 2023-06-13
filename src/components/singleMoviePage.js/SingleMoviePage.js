import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import setContent from '../utils/setContent';

import useMovieService from '../../services/MovieService';

import './singleMoviePage.css';

const SingleMoviePage = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [dateStyle, setDateStyle] = useState('');
    const navigate = useNavigate();

    const {getMovie, clearError, process, setProcess} = useMovieService();

    useEffect(() => {
        updateMovie()
    }, [id])

    const goBack = () => navigate(-1);

    const updateMovie = () => {
        clearError();
        getMovie(id)
            .then(onMovieLoaded).then(() => setProcess('confirmed'));
    }

    const onMovieLoaded = (movie) => {
        setMovie(movie);
        setDateStyle(new Date() > new Date(movie.release_date.split("-")[1] + '-' + movie.release_date.split("-")[0] + '-' + movie.release_date.split("-")[2]) ? 'green' : 'red');
    }

    const renderItem = (movie) => {
        return (
            <div className="item_wrapper">
                <img src={movie.icon} alt={movie.title} className="item_icon"/>
                <div className="item_text_wrapper">
                    <div className="item_cross" onClick={goBack}></div>
                    <h2 className='item_title'>{movie.title}</h2>
                    <h3 className='item_date' style={{borderColor: `${dateStyle}`, color: `${dateStyle}`}}>{movie.release_date}</h3>
                    <div className="score_wrapper">
                        {movie.vote > 6 ? <span className="star"></span> : null}
                        <h3 className='item_score'>{movie.vote}/10</h3>
                    </div>
                    <div className="item_genres">
                        {movie.genres.map(item => <div key={item.id} className="item_genre">{item.name === 'Science Fiction' ? 'Sci-fi' : item.name}</div>)}
                    </div>
                    <div className="item_descr">{movie.description}</div>
                </div>
            </div>
        )
    }

    return setContent(process, () => renderItem(movie), movie);
}

export default SingleMoviePage;