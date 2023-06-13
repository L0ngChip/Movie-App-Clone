import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames/bind';

import styles from './MovieList.module.scss';
import tmdbApi, { category } from '~/api/tmdbApi';
import { MovieItem } from '../MovieItem';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

const cx = classNames.bind(styles);
const MovieList = (props) => {
    const [items, setItems] = useState([]);

    const handleLeft = () => {
        var slider = document.getElementById('slider' + props.rowId);
        slider.scrollLeft = slider.scrollLeft - 990;
    };

    const handleRight = () => {
        var slider = document.getElementById('slider' + props.rowId);
        slider.scrollLeft = slider.scrollLeft + 990;
    };

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
                    // break;
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
            <AiFillCaretLeft size={40} className={cx('btn-left')} onClick={handleLeft} />
            <Swiper
                id={'slider' + props.rowId}
                className={cx('slider')}
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {items?.map((item, i) => (
                    <SwiperSlide key={i} className={cx('movie-item')}>
                        <MovieItem item={item} category={props.category} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <AiFillCaretRight size={40} className={cx('btn-right')} onClick={handleRight} />
        </div>
    );
};

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default MovieList;
