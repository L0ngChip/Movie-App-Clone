import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets';
import { UserAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);
const headerNav = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Movies',
        path: '/movie',
    },
    {
        display: 'TvSeries',
        path: '/tv',
    },
];

const Header = () => {
    const { pathname } = useLocation();
    const headerRef = useRef(null);
    const active = headerNav.findIndex((e) => e.path === pathname);
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        };
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <>
            {user?.email ? (
                <div ref={headerRef} className={cx('header')}>
                    <div className={cx('header_wrap', 'container')}>
                        <div className={cx('logo')}>
                            <img src={images.logo} alt="logo" />
                            <Link to="/">zMovies</Link>
                        </div>
                        <ul className={cx('header_nav')}>
                            {headerNav?.map((e, i) => (
                                <li key={i} className={cx(`${i === active ? 'active' : ''}`)}>
                                    <Link to={e.path}>{e.display}</Link>
                                </li>
                            ))}
                        </ul>
                        <div className={cx('header_btn')}>
                            <Link to="/account">
                                <button className={cx('header_btn_account')}>Account</button>
                            </Link>
                            <button onClick={handleLogOut} className={cx('header_btn_logout')}>
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div ref={headerRef} className={cx('header')}>
                    <div className={cx('header_wrap', 'container')}>
                        <div className={cx('logo')}>
                            <img src={images.logo} alt="logo" />
                            <Link to="/">zMovies</Link>
                        </div>
                        <ul className={cx('header_nav')}>
                            {headerNav?.map((e, i) => (
                                <li key={i} className={cx(`${i === active ? 'active' : ''}`)}>
                                    <Link to={e.path}>{e.display}</Link>
                                </li>
                            ))}
                        </ul>
                        <div className={cx('header_btn')}>
                            <Link to="/login">
                                <button className={cx('header_btn_login')}>Sign In</button>
                            </Link>
                            <Link to="/register">
                                <button className={cx('header_btn_register')}>Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
