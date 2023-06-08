import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './MovieList.module.scss';
import { Button } from '../Button';
import tmdbApi, { category } from '~/api/tmdbApi';
import apiConfig from '~/api/apiConfig';
import { MovieItem } from '../MovieItem';

const cx = classNames.bind(styles);
const MovieList = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};
            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params });
                }
            } else {
                // eslint-disable-next-line no-unused-vars
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        };
        getList();
    });
    return (
        <div className={cx('movie-list')}>
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                {items?.map((item, i) => (
                    <SwiperSlide key={i} className={cx('movie-item')}>
                        <MovieItem item={item} category={props.category} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default MovieList;
