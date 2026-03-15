import {Link} from 'react-router-dom';
import "../index.css"

function NavBar(){
    return (
        <nav className='navbar'>
            <div className='navbar-container'> 
                <div className='navbar-logo'>
                    <Link to="/">YuGiOh App</Link>
                </div>

                <div className='navbar-links'>
                    <Link to="/">Home</Link>
                    <Link to="/search-card">Search Card</Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar