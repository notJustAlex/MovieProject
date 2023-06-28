import {useState, useEffect} from 'react';
import { useNavigate, NavLink, useMatch } from 'react-router-dom';

import {useTheme} from '../../hooks/useTheme';

import './serchPanel.css';

const SerchPanel = () => {
    const [str, setStr] = useState('');
    const navigate = useNavigate();
    const {theme, setTheme} = useTheme();

    useEffect(() => { 
        updateInput();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const match = useMatch('/search/:query');
    const updateInput = () => {
        if (match && match.params.query !== null) {
            setStr(match && match.params.query)
        }
    }

    const onUpdateInput = (title) => {
        title === '' ? navigate(`/`, {replace: false}) : navigate(`/search/${title}`, {replace: false});
        setStr(title);
    }

    const handleLightThemeClick = () => {
        setTheme(theme => theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="search_wrapper">
            <h2 className="search_title" onClick={() => onUpdateInput('')}><NavLink to={'/'}>Find me a movie</NavLink></h2>
            <div className="theme-switcher">
                <input title="Toggles light & dark" type="checkbox" id="switcher" checked={theme === 'light' ? false : true} onChange={() =>  setTheme(theme => theme === 'light' ? 'dark' : 'light')}/>
                <label htmlFor='switcher' >switch</label>
            </div>
            <input 
                value={str} 
                autoComplete="off" 
                id='search_input' 
                className="search_input" 
                type='text' 
                placeholder="E.g. Harry Potter" 
                onChange={(e) => onUpdateInput(e.target.value)}>
            </input>
        </div>
    )
}

export default SerchPanel;