import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './serchPanel.css';

const SerchPanel = () => {
    const [str, setStr] = useState('');
    const navigate = useNavigate();

    const onUpdateInput = (title) => {
        title === '' ? navigate(`/`, {replace: false}) : navigate(`/search/${title}`, {replace: false})
    }

    return (
        <div className="search_wrapper">
            <h2 className="search_title">Find movies</h2>
            <input value={str} autocomplete="off" id='search_input' className="search_input" type='text' placeholder="E.g. Harry Potter" onChange={(e) => {onUpdateInput(e.target.value); setStr(e.target.value)}}></input>
        </div>
    )
}

export default SerchPanel;