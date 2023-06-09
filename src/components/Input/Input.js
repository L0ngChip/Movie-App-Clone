import React from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.scss';
const cx = classNames.bind(styles);
const Input = (props) => {
    return (
        <>
            <input
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange ? (e) => props.onChange(e) : null}
            />
        </>
    );
};

export default Input;
