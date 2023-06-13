import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '~/context/AuthContext';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiFillCaretLeft, AiFillCaretRight, AiFillDelete } from 'react-icons/ai';

import styles from './SavedShows.module.scss';
import { Button } from '../Button';
import apiConfig from '~/api/apiConfig';
import { db } from '~/firebase';

const cx = classNames.bind(styles);
const SavedShows = () => {
    const { user } = UserAuth();

    const [shows, setShows] = useState([] || null);
    useEffect(() => {
        // Read data from savedShows field
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setShows(doc.data()?.savedShows);
        });
    }, [user?.email]);

    const handleDelete = (passID) => {
        const movieRef = doc(db, 'users', `${user?.email}`);
        try {
            const result = shows.filter((item) => item.id !== passID);
            updateDoc(movieRef, {
                savedShows: result,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 990;
    };

    const handleRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 990;
    };

    return shows?.length > 0 ? (
        <>
            {shows && (
                <>
                    <div className={cx('list')}>
                        <h2 className={cx('list-title', 'mb-2')}>My Shows</h2>
                        <div className={cx('list-item', 'section')}>
                            <AiFillCaretLeft size={40} className={cx('btn-left')} onClick={handleLeft} />

                            <Swiper
                                id="slider"
                                style={{ scrollBehavior: 'smooth' }}
                                grabCursor={true}
                                spaceBetween={10}
                                slidesPerView={'auto'}
                            >
                                {shows?.map((item, i) => (
                                    <SwiperSlide key={i} className={cx('movie-item')}>
                                        <Link to={item?.type + '/' + item?.id}>
                                            <div
                                                className={cx('movie-card')}
                                                style={{
                                                    backgroundImage: `url(${apiConfig.w500Image(
                                                        item?.img || item?.poster,
                                                    )})`,
                                                }}
                                            >
                                                <Button className={cx('btn')}>
                                                    <i className={cx('bx', 'bx-play')}></i>
                                                </Button>
                                            </div>
                                        </Link>
                                        <div className={cx('info')}>
                                            <Link>
                                                <h3>{item?.title || item?.name}</h3>
                                            </Link>
                                            <div onClick={() => handleDelete(item?.id)}>
                                                <AiFillDelete
                                                    size={24}
                                                    className={cx('icon-delete')}
                                                    style={{ color: 'red' }}
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <AiFillCaretRight size={40} className={cx('btn-right')} onClick={handleRight} />
                        </div>
                    </div>
                </>
            )}
        </>
    ) : (
        <div className={cx('no-list')}>
            <h2 className={cx('no-list-title')}>List show is empty, let's add your favorite shows</h2>
        </div>
    );
};

export default SavedShows;
