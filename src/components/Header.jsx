import { Link } from 'react-router-dom';

import logo from "../graphics/Logo.svg";
import file from "../graphics/File.svg";
import util from "../graphics/Util.svg";
import skat from "../graphics/SKAT.svg";
import help from "../graphics/Help.svg";
import user from "../graphics/User.svg";

export default function Header() {
    return (
        <header>
            <div className="menu-area">
                <Link to="/" className='logo'>
                    <img src={logo} alt="Customs Document Control logo" width={"50px"} />
                    <div>
                        <h3>Customs<br />Document<br />Control</h3>
                    </div>
                </Link>
                <nav>
                    <div className='menu-item'>
                        <img src={file} alt="File"/>
                        <h3>File</h3>
                    </div>
                    <div className='menu-item'>
                        <img src={util} alt="Util"/>
                        <h3>Util</h3>
                    </div>
                    <div className='menu-item'>
                        <img src={skat} alt="SKAT"/>
                        <h3>SKAT</h3>
                    </div>
                    <div className='menu-item'>
                        <img src={help} alt="Help"/>
                        <h3>Help</h3>
                    </div>
                    <div className='menu-item'>
                        <img src={user} alt="User"/>
                        <h3>User</h3>
                    </div>
                </nav>
            </div>
        </header>
    )
}