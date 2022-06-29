import React, { FC } from 'react';

import { Link } from 'react-router-dom';
import MainBlock from '../games/blockGame/Components/MainBlock';


const BlockPage = () => {
    
    return (
        <div >
            <Link to="/">Головна</Link>
            <div>
                Block game
            </div>
            <div className="col-12 d-flex justify-content-center">
                <div>
                    
                        <MainBlock />
                        
                   
                </div>
            </div>
        </div>
    );
};

export default BlockPage;