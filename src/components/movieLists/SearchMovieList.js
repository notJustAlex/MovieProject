import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link, useParams } from 'react-router-dom';

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

const SearchMovieList = (props) => {
    const [movieList, setMovieList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [page, setPage] = useState(1);

    const { getMovieByTitle, process, setProcess} = MovieService();

    const {str} = useParams();

    useEffect(() => {
        setPage(1)
        setMovieList([])
        onRequest(1, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [str])

    const onRequest = (page, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getMovieByTitle(str, page).then(res => onMovieListLoaded(res)).then(() => setProcess('confirmed'));
    }

    const onMovieListLoaded = (newMovieList) => {
        setMovieList(movieList => [...movieList, ...newMovieList]);
        setNewItemLoading(newItemLoading => false);
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
                return (
                    <CSSTransition key={item.id} timeout={500} classNames='movie_item'>
                        <li 
                        className='movie_item'
                        tabIndex={++i}
                        key={item.id}
                        onClick={() => props.onMovieSelected}>
                            <Link to={`/movie/${item.id}`}>
                                {item.icon !== 'none' ? <img src={item.icon} alt={item.title}/> : <div className='movie_empty_title'><p>{item.title}</p></div>}
                            </Link>
                            <div className='movie_item_additional_date' key={item.id}>({item.release_date !== '' ? item.release_date.split('-')[2] : 'soon!'})</div>
                        </li>
                    </CSSTransition>
                )
            });

        return (
            <>
                <h2 className='movie_recomended_title'>search results</h2>
                <ul className="movie_grid">
                    <TransitionGroup component={null}>
                        {items}
                    </TransitionGroup>
                </ul>
                    <div className="movie_list_nav_wrapper">
                        <button className='next_button' 
                            onClick={() => {
                            setPage(page => page+1);
                            onRequest(page+1);
                            }}
                            disabled={page>=500 || items.length < 15 ? true : false}>
                                load more
                        </button>
                </div>
            </>
        )
    }

    const onError = () => {
        return (
            <div className='error_search_wrapper'>
                <div className="error_search_img"></div>
                <h2 className="error_search_h2">Oops...</h2>
                <div className="error_search_title">We couldn't find that movie. <br/> Rephrase the search term and try again.</div>
            </div>
        )
    }

    const elements = useMemo(() => {
        return  movieList.length === 0 && process === 'confirmed' ? onError() : setContent(process, () => renderItems(movieList), newItemLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [process]);


    return (
        <div className="movie_list">
            {elements}
        </div>
    )
}

SearchMovieList.propsTypes = {
    onMovieSelected: PropTypes.func.isRequired
}

export default SearchMovieList;