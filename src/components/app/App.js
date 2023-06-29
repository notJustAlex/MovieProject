import {lazy, Suspense} from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';

import SerchPanel from "../serchPanel/SerchPanel";
import Spinner from "../spinner/Spinner";

const MovieList = lazy(() => import("../movieLists/MovieList"));
const SearchMovieList = lazy(() => import("../movieLists/SearchMovieList"));
const SingleMoviePage = lazy(() => import("../singleMoviePage.js/SingleMoviePage"));
const ErrorMessage = lazy(() => import("../errorMessage/ErrorMessage"));

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
                            <Route path='*' element={<ErrorMessage/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router> 
    )
}

export default App;