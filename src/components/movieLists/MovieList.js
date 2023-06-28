import PropTypes from 'prop-types';
import { useState, useEffect, useMemo, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

import MovieService from '../../services/MovieService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './movieList.css';

const setContent = (process, Component , newItemLoading) => {
    switch(process){
        case 'waiting':
            return <Spinner/>;
        case 'loading': 
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed': 
            return <Component/>;
        case 'error': 
            return <ErrorMessage/>;
        default: 
            throw new Error('Unexpected process state');
    }
}

const MovieList = (props) => {
    const [movieList, setMovieList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [page, setPage] = useState(1);

    const { getRecomendedMovies, process, setProcess} = MovieService();
    
    useEffect(() => {
        onRequest(page, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onRequest = (page, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getRecomendedMovies(page).then(res => onMovieListLoaded(res)).then(() => setProcess('confirmed'));
    }

    const onMovieListLoaded = (newMovieList) => {
        setMovieList(movieList => [...movieList, ...newMovieList]);
        setNewItemLoading(newItemLoading => false);
    }
    const itemRefs = useRef([]);

    function renderItems(arr) {
        const items = arr.map((item, i) => {
                return (
                    <CSSTransition key={item.id} timeout={500} classNames="movie_item">
                        <li 
                        className="movie_item"
                        tabIndex={++i}
                        key={item.id}
                        ref={elem => itemRefs.current[i] = elem}
                        onClick={() => props.onMovieSelected}>
                            <Link to={`/movie/${item.id}`}>
                                {item.icon !== 'none' ? <img src={item.icon} alt={item.title}/> : <div className='movie_empty_item'>{item.title}</div>}
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
                <div className="movie_list_nav_wrapper">
                <button className='next_button' onClick={() => {
                    setPage(page => page+1);
                    onRequest(page+1);
                }}
                disabled={page>=500 ? true : false}>
                    load more
                </button>
            </div>
            </>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(movieList), newItemLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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