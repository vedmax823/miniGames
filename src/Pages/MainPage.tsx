import React, {FC} from 'react';
import { Link } from 'react-router-dom';

const MainPage:FC = () => {
    return (
        <div>
            Головна
            <div>
                <span className="ms-4"><Link to="/block" >Block game</Link></span>
                <span className="ms-4"><Link to="/2048">2048</Link></span>
            </div>
        </div>
    );
};

export default MainPage;