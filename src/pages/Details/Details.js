import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Details.module.scss';
import tmdbApi from '~/api/tmdbApi';
import apiConfig from '~/api/apiConfig';
import { CastList } from '~/components/CastList';
import { VideoList } from '~/components/VideoList';
import { MovieList } from '~/components/MovieList';

const cx = classNames.bind(styles);

const Details = () => {
    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);
        };
        getDetail();
    }, [category, id]);
    // console.log(item);
    return (
        <>
            {item && (
                <>
                    <div
                        className={cx('banner')}
                        style={{
                            backgroundImage: `url(${apiConfig.originalImage(
                                item?.backdrop_path || item?.poster_path,
                            )})`,
                        }}
                    ></div>
                    <div className={cx('movie-content', 'mb-3 container')}>
                        <div className={cx('movie-content_poster')}>
                            <div
                                className={cx('movie-content_poster_img')}
                                style={{
                                    backgroundImage: `url(${apiConfig.originalImage(
                                        item?.poster_path || item?.backdrop_path,
                                    )})`,
                                }}
                            ></div>
                        </div>
                        <div className={cx('movie-content_info')}>
                            <div className={cx('title')}>{item?.title || item?.name}</div>
                            <div className={cx('genres')}>
                                {item?.genres &&
                                    item?.genres?.slice(0, 5)?.map((genre, i) => (
                                        <span key={i} className={cx('genres_item')}>
                                            {genre?.name}
                                        </span>
                                    ))}
                            </div>
                            <div className={cx('overview')}>{item?.overview}</div>
                            <div className={cx('cast')}>
                                <div className="section_header">
                                    <h2>Casts</h2>
                                </div>
                                <CastList id={item?.id} />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="section mb-3">
                            <VideoList id={item.id} />
                        </div>
                    </div>
                    <div className="container">
                        <div className="section mb-3">
                            <div className="section_header mb-2">
                                <h2>Similar</h2>
                            </div>
                            <MovieList category={category} type="similar" id={item?.id} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Details;
