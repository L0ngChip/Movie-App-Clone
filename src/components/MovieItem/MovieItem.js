import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';

import styles from './MovieItem.module.scss';
import apiConfig from '~/api/apiConfig';
import { Button } from '../Button';
import { UserAuth } from '~/context/AuthContext';
import { db } from '~/firebase';
import { SavedShows } from '../SavedShows';

const cx = classNames.bind(styles);

const MovieItem = ({ item, category }) => {
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const [savedShows, setSavedShows] = useState([] || null);

    const { user } = UserAuth();

    const link = category + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    const handleSavedShows = async () => {
        const movieID = doc(db, 'users', `${user?.email}`);

        if (user?.email) {
            setLike(!like);
            setSaved(true);

            await updateDoc(movieID, {
                savedShows: arrayUnion({
                    id: item?.id,
                    title: item?.title || item?.name,
                    img: item?.backdrop_path,
                    poster: item?.poster_path,
                    type: category,
                }),
            });
        } else {
            alert('Please log in your account to add this movie!');
        }
    };

    useEffect(() => {
        // Read data from savedShows field
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setSavedShows(doc.data()?.savedShows);
        });
    }, [user?.email]);

    const handleUnSave = (passID) => {
        setLike(!like);
        const movieRef = doc(db, 'users', `${user?.email}`);
        try {
            const result = savedShows.filter((item) => item.id !== passID);
            updateDoc(movieRef, {
                savedShows: result,
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div>
                <Link to={link}>
                    <div className={cx('movie-card')} style={{ backgroundImage: `url(${bg})` }}>
                        <Button className={cx('btn')}>
                            <i className={cx('bx', 'bx-play')}></i>
                        </Button>
                    </div>
                </Link>
                <div className={cx('info')}>
                    <Link>
                        <h3>{item?.title || item?.name}</h3>
                    </Link>
                    <div>
                        {like ? (
                            <AiFillHeart
                                size={24}
                                className={cx('icon-heart')}
                                style={{ color: 'red' }}
                                onClick={() => handleUnSave(item?.id)}
                            />
                        ) : (
                            <AiOutlineHeart size={24} className={cx('icon-heart')} onClick={handleSavedShows} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieItem;
