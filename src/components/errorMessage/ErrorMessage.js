import {NavLink} from 'react-router-dom';

import './errorMessage.css';

const ErrorMessage = () => {
    return (
        <div className='error_wrapper'>
            <div className="error_img"></div>
            <h2 className="error_h2">Oops...</h2>
            <div className="error_title">Something went wrong on our end. Try to  <NavLink to='/'>refresh</NavLink>the page</div>
        </div>
    )
}

export default ErrorMessage;