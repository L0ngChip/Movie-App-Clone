import React from 'react';
import classNames from 'classnames/bind';

import styles from './Account.module.scss';
import images from '~/assets';
import { Link } from 'react-router-dom';
import { SavedShows } from '~/components/SavedShows';
import { Footer } from '~/components/Footer';

const cx = classNames.bind(styles);

const Account = () => {
    return (
        <>
            <div className="container">
                <div className={cx('header')}>
                    <div className={cx('header_wrap', 'container')}>
                        <div className={cx('logo')}>
                            <img src={images.logo} alt="logo" />
                            <Link to="/">zMovies</Link>
                        </div>
                        <div className={cx('header_btn')}>
                            <Link to="/account">
                                <button className={cx('header_btn_login')}>Account</button>
                            </Link>

                            <button className={cx('header_btn_register')}>Log Out</button>
                        </div>
                    </div>
                </div>
                <img className={cx('account-bg')} src={images.bgFooter} alt="background" />
                <div className={cx('account')}>
                    <h1 className={cx('account-title')}>My Favorite Shows</h1>
                </div>
                <SavedShows />
                <Footer />
            </div>
        </>
    );
};

export default Account;
