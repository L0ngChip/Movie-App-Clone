import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './MovieItem.module.scss';
import apiConfig from '~/api/apiConfig';
import { category } from '~/api/tmdbApi';
import { Button } from '../Button';

const cx = classNames.bind(styles);

const MovieItem = (props) => {
    const item = props.item;

    const link = category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    return (
        <>
            <Link to={link}>
                <div className={cx('movie-card')} style={{ backgroundImage: `url(${bg})` }}>
                    <Button className={cx('btn')}>
                        <i className={cx('bx', 'bx-play')}></i>
                    </Button>
                </div>
                <h3>{item?.title || item?.name}</h3>
            </Link>
        </>
    );
};

export default MovieItem;
