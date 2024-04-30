import React from 'react';
import styles from './Loading.module.css';

const Loading: React.FC = () => {
    return <div className={styles.ldsellipsis}><div></div><div></div><div></div><div></div></div>;
};

export default Loading;