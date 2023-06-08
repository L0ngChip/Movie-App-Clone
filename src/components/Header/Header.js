import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets';

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
            </div>
        </div>
    );
};

export default Header;
