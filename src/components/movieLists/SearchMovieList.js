import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link, useParams } from 'react-router-dom';

import MovieService from '../../services/MovieService';
import setContent from '../utils/setContent';

import './movieList.css';

const SearchMovieList = (props) => {
    const [movieList, setMovieList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [movieEnded, setMovieEnded] = useState(false);

    const { getMovieByTitle, process, setProcess} = MovieService();

    const {str} = useParams();

    useEffect(() => {
        onRequest(true);
    }, [str])

    const onRequest = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getMovieByTitle(str).then(res => onMovieListLoaded(res)).then(() => setProcess('confirmed'));
    }

    const onMovieListLoaded = (newMovieList) => {
        let ended = false;

        if(newMovieList.length < 10) {
            ended = true;
        }

        setMovieList(movieList => [...newMovieList]);
        setNewItemLoading(newItemLoading => false);
        setMovieEnded(movieEnded => ended);
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
                                {item.icon ? <img src={item.icon} alt={item.title}/> : <div className='movie_empty_title'>{item.title}</div>}
                            </Link>
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
        return movieList.length > 0 ? setContent(process, () => renderItems(movieList), newItemLoading) : onError();
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