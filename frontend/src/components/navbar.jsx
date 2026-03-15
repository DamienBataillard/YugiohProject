import {Link} from 'react-router-dom';
import logo from "../assets/yu gi oh logo.png";
import "../index.css"

function NavBar(){
    return (
        <nav className='navbar'>
            <div className='navbar-container'> 
                <div className='navbar-logo'>
                    <Link to="/">
                        <img src={logo} alt="YuGiOh Logo" className="navbar-logo-img"/>
                    </Link>
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