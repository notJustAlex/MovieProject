import { Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import SerchPanel from "../serchPanel/SerchPanel";
import MovieList from "../movieLists/MovieList";
import SearchMovieList from '../movieLists/SearchMovieList';
import SingleMoviePage from "../singleMoviePage.js/SingleMoviePage";
import Spinner from "../spinner/Spinner";

import '../../style/index.css';

const App = () => {
    return (
        <Router>
            <div className="app">
                <SerchPanel/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route exact path='/' element={<MovieList/>}/>
                            <Route path='/search/:str' data='str' element={<SearchMovieList/>}/>
                            <Route path="/movie/:id" element={<SingleMoviePage/>} dataType='movie'/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router> 
    )
}

export default App;