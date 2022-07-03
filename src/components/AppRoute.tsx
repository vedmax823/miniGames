import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import BlockPage from '../Pages/BlockPage';
import ChessPage from '../Pages/ChessPage';
import MainPage from '../Pages/MainPage';
import TwoZeroFourEight from '../Pages/TwoZeroFourEight';



const AppRoute:FC = () => {
    return (
        <Routes>
            <Route path = "/" element={<MainPage/>}/>
            <Route path ="/block" element={<BlockPage />} />
            <Route path="2048" element={<TwoZeroFourEight />} />
            <Route path="chess" element={<ChessPage />} />
        </Routes>
    );
};

export default AppRoute;