import React from 'react';
import { loadingImg } from '../../assets';

const Loading: React.FC = () => {
    return <img src={loadingImg} alt="Loading..." />;
};

export default Loading;