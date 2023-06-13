import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import { UserAuth } from '~/context/AuthContext';
import styles from './Register.module.scss';
import { Input } from '~/components/Input';
import { Button } from '~/components/Button';
import images from '~/assets';

const cx = classNames.bind(styles);
const Register = () => {
    const { signUp } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={cx('header')}>
                <div className={cx('header_wrap', 'container')}>
                    <div className={cx('logo')}>
                        <img src={images.logo} alt="logo" />
                        <Link to="/">zMovies</Link>
                    </div>
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
            <div className="container" style={{ height: '100vh' }}>
                <img className={cx('bg-login')} src={images.bgFooter} alt="background" />
                <div className={cx('login')}>
                    <div className={cx('login-overlay')}>
                        <div className={cx('login-bg')}>
                            <h1 className={cx('login-title')}>Sign Up</h1>
                            <form onSubmit={handleSubmit} className={cx('login-form')}>
                                <Input
                                    className={cx('input')}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Email"
                                />
                                <Input
                                    className={cx('input')}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                />
                                <Button className={cx('button')}>Sign Up</Button>
                            </form>
                            <div className={cx('remember-password')}>
                                <div style={{ display: 'flex' }}>
                                    <input type="checkbox" style={{ marginRight: '8px' }} />
                                    <p>Remember me</p>
                                </div>
                                <p>Need help?</p>
                            </div>
                            <div className={cx('sign-in-link')}>
                                <p style={{ fontSize: '14px', color: 'rgb(75,85,99)' }}>Already subscribed to ZMovie</p>
                                <Link to="/login">Sign In</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
