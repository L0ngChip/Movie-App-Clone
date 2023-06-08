import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './CastList.module.scss';
import tmdbApi from '~/api/tmdbApi';
import apiConfig from '~/api/apiConfig';

const cx = classNames.bind(styles);
const CastList = (props) => {
    const { category } = useParams();

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(category, props.id);
            setCasts(res.cast.slice(0, 6));
        };
        getCredits();
    }, [category, props.id]);
    return (
        <div className={cx('casts')}>
            {casts?.map((item, i) => (
                <div key={i} className={cx('casts_item')}>
                    <div
                        className={cx('casts_item_img')}
                        style={{ backgroundImage: `url(${apiConfig.w500Image(item?.profile_path)})` }}
                    ></div>
                    <p className={cx('casts_item_name')}>{item?.name}</p>
                </div>
            ))}
        </div>
    );
};

export default CastList;
