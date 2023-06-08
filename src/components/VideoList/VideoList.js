import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '~/api/tmdbApi';
import { VideoItem } from './VideoItem';

const VideoList = (props) => {
    const { category } = useParams();

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const res = await tmdbApi.getVideos(category, props.id);
            setVideos(res.results.slice(0, 4));
        };
        getVideos();
    }, [category, props.id]);
    return (
        <>
            {videos?.map((item, i) => (
                <VideoItem key={i} item={item} />
            ))}
        </>
    );
};

export default VideoList;
