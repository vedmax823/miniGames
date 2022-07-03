import React from 'react';
import { Link } from 'react-router-dom';
import BoardChessComponent from '../games/chess/Components/BoardChessComponent';
import MainChessComponent from '../games/chess/Components/MainChessComponent';

const ChessPage = () => {
    return (
        <div >
            <Link to="/">Головна</Link>
            <div>
                Chess
            </div>
            <div className="col-12 d-flex justify-content-center">
                <div>
                    <MainChessComponent />
                </div>
            </div>
        </div>
    );
};

export default ChessPage;