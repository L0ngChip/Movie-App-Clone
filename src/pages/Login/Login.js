import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';
import { UserAuth } from '~/context/AuthContext';
import { Input } from '~/components/Input';
import images from '~/assets';

const cx = classNames.bind(styles);
const Login = () => {
    const { logIn } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await logIn(email, password);
            navigate('/');
        } catch (error) {
            setError('Email or password is incorrect, please try again!');
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
                            <h1 className={cx('login-title')}>Sign In</h1>
                            {error && <p className={cx('error')}>{error}</p>}
                            <form onSubmit={handleLogin} className={cx('login-form')}>
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
                                <button className={cx('button')}>Sign In</button>
                            </form>
                            <div className={cx('remember-password')}>
                                <div style={{ display: 'flex' }}>
                                    <input type="checkbox" style={{ marginRight: '8px' }} />
                                    <p>Remember me</p>
                                </div>
                                <p>Need help?</p>
                            </div>
                            <div className={cx('sign-up-link')}>
                                <p style={{ fontSize: '14px', color: 'rgb(75,85,99)' }}>New account to ZMovie</p>
                                <Link to="/register">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
