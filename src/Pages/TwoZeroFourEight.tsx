import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import Board2048Component from '../games/2048/Components/Board2048Component';

const TwoZeroFourEight:FC = () => {
    return (
        <div>
            <Link to="/" >Головна</Link>
            <div>2048</div>
            <div className="col-12 d-flex justify-content-center pt-4">
                <Board2048Component />
            </div>
        </div>
    );
};

export default TwoZeroFourEight;