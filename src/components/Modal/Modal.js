import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

const Modal = (props) => {
    const [active, setActive] = useState(false);
    useEffect(() => {
        setActive(props.active);
    }, [props.active]);

    return (
        <div id={props.id} className={cx('modal', `${active ? 'active' : ''}`)}>
            {props.children}
        </div>
    );
};

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string,
};

export const ModalContent = (props) => {
    const contentRef = useRef(null);

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active');
        if (props.onClose) props.onClose();
    };
    return (
        <div ref={contentRef} className={cx('modal__content')}>
            {props.children}
            <div className={cx('modal__content__close')} onClick={closeModal}>
                <i className={cx('bx', 'bx-x')}></i>
            </div>
        </div>
    );
};

export default Modal;
