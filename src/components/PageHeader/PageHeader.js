import React from 'react';
import classNames from 'classnames/bind';

import styles from './PageHeader.module.scss';
import images from '~/assets';
const cx = classNames.bind(styles);
const PageHeader = (props) => {
    return (
        <div className={cx('page-header')} style={{ backgroundImage: `url(${images.bgFooter})` }}>
            <h2>{props.children}</h2>
        </div>
    );
};

export default PageHeader;
