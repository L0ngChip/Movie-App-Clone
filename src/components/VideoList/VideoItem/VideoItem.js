import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './VideoItem.module.scss';

const cx = classNames.bind(styles);
const VideoItem = ({ item }) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    });
    return (
        <div className={cx('video')}>
            <div className={cx('video_title')}>
                <h2>{item?.name}</h2>
            </div>
            <iframe src={`https://youtube.com/embed/${item?.key}`} ref={iframeRef} width="100%" title="video"></iframe>
        </div>
    );
};

export default VideoItem;
