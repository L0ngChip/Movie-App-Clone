import React from 'react';
import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import images from '~/assets';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div className={cx('footer')} style={{ backgroundImage: `url(${images.bgFooter})` }}>
            <div className={(cx('footer_content'), 'container')}>
                <div className={cx('footer_content_logo')}>
                    <div className={cx('logo')}>
                        <img src={images.logo} alt="" />
                        <Link to="/">zMovie</Link>
                    </div>
                </div>
                <div className={cx('footer_content_menus')}>
                    <div className={cx('footer_content_menu')}>
                        <Link to="/">Home</Link>
                        <Link to="/">Contact us</Link>
                        <Link to="/">Term of services</Link>
                        <Link to="/">About us</Link>
                    </div>
                    <div className={cx('footer_content_menu')}>
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Pravacy</Link>
                    </div>
                    <div className={cx('footer_content_menu')}>
                        <Link to="/">You must watch</Link>
                        <Link to="/">Recent release</Link>
                        <Link to="/">Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
