import {useState, useEffect} from 'react';
import { useNavigate, NavLink, useMatch } from 'react-router-dom';

import './serchPanel.css';

const SerchPanel = () => {
    const [str, setStr] = useState('');
    const navigate = useNavigate();

    useEffect(() => { 
        updateInput();
    }, [])

    const match = useMatch('/search/:query');
    const updateInput = () => {
        setStr(match && match.params.query)
    }

    const onUpdateInput = (title) => {
        title === '' ? navigate(`/`, {replace: false}) : navigate(`/search/${title}`, {replace: false});
        setStr(title);
    }

    return (
        <div className="search_wrapper">
            <h2 className="search_title" onClick={() => onUpdateInput('')}><NavLink to={'/'}>Find me a movie</NavLink></h2>
            <input value={str} autoComplete="off" id='search_input' className="search_input" type='text' placeholder="E.g. Harry Potter" onChange={(e) => onUpdateInput(e.target.value)}></input>
        </div>
    )
}

export default SerchPanel;