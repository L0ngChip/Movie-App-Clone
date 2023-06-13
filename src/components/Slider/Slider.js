import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

import styles from './Slider.module.scss';
import tmdbApi, { category, movieType } from '~/api/tmdbApi';
import apiConfig from '~/api/apiConfig';
import { Button } from '../Button';
import { OutlineButton } from '../Button/Button';
import { Modal } from '../Modal';
import { ModalContent } from '../Modal/Modal';

const cx = classNames.bind(styles);
const Slider = () => {
    SwiperCore.use([Autoplay]);
    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const params = { page: 1 };
        const getMovies = async () => {
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMovieItems(response?.results.slice(0, 4));
            } catch {
                console.log('error');
            }
        };
        getMovies();
    }, []);

    return (
        <div className={cx('slider')}>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
            >
                {movieItems?.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive }) => <SliderItem item={item} className={cx(`${isActive ? 'active' : ''}`)} />}
                    </SwiperSlide>
                ))}
            </Swiper>
            {movieItems?.map((item, i) => (
                <TrailerModal key={i} item={item} />
            ))}
        </div>
    );
};

const SliderItem = (props) => {
    let navigate = useNavigate();

    const item = props.item;

    const background = apiConfig.originalImage(item?.backdrop_path ? item?.backdrop_path : item?.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const modalChild = modal.querySelectorAll('div')[0].querySelector('iframe');

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        console.log(modalChild);
        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modalChild.setAttribute('src', videSrc);
        } else {
            modal.querySelectorAll('div')[0].innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    };

    return (
        <div className={cx('slider_item', `${props.className}`)} style={{ backgroundImage: `url(${background})` }}>
            <div className={cx('slider_item_content', 'container')}>
                <div className={cx('slider_item_content_info')}>
                    <h2 className={cx('title')}>{item?.title}</h2>
                    <div className={cx('overview')}>{item?.overview}</div>
                    <div className={cx('btns')}>
                        <Button onClick={() => navigate('/movie/' + item?.id)}>Watch now</Button>
                        <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
                    </div>
                </div>
                <div className={cx('slider_item_content_poster')}>
                    <img src={apiConfig.w500Image(item?.poster_path)} alt="poster" />
                </div>
            </div>
        </div>
    );
};

const TrailerModal = (props) => {
    const item = props.item;
    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item?.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    );
};
export default Slider;
