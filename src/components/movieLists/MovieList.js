import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

import MovieService from '../../services/MovieService';
import setContent from '../utils/setContent';

import './movieList.css';

const MovieList = (props) => {
    const [movieList, setMovieList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [movieEnded, setMovieEnded] = useState(false);

    const { getRecomendedMovies, process, setProcess} = MovieService();

    useEffect(() => {
        onRequest(true);
    }, [])

    const onRequest = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getRecomendedMovies().then(res => onMovieListLoaded(res)).then(() => setProcess('confirmed'));
    }

    const onMovieListLoaded = (newMovieList) => {
        let ended = false;

        if(newMovieList.length < 10) {
            ended = true;
        }

        setMovieList(movieList => [...movieList, newMovieList]);
        setNewItemLoading(newItemLoading => false);
        setMovieEnded(movieEnded => ended);
    }

    function renderItems(arr) {
        const items = arr[0].map((item, i) => {
                return (
                    <CSSTransition key={item.id} timeout={500} classNames="movie_item">
                        <li 
                        className="movie_item"
                        tabIndex={++i}
                        key={item.id}
                        onClick={() => props.onMovieSelected}>
                            <Link to={`/movie/${item.id}`}>
                                {item.icon ? <img src={item.icon} alt={item.title}/> : <div className='movie_empty_item'>{item.title}</div>}
                            </Link>
                        </li>
                    </CSSTransition>
                )
            });

        return (
            <>
                <h2 className='movie_recomended_title'>you might like</h2>
                <ul className="movie_grid">
                    <TransitionGroup component={null}>
                        {items}
                    </TransitionGroup>
                </ul>
            </>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(movieList), newItemLoading);
    }, [process]);


    return (
        <div className="movie_list">
            {elements}
        </div>
    )
}

MovieList.propsTypes = {
    onMovieSelected: PropTypes.func.isRequired
}

export default MovieList;