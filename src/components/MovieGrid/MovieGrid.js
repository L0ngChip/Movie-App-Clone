import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './MovieGrid.module.scss';
import { MovieItem } from '../MovieItem';
import tmdbApi, { category, movieType, tvType } from '~/api/tmdbApi';
import Button, { OutlineButton } from '../Button/Button';
import { Input } from '../Input';

const cx = classNames.bind(styles);

const MovieGrid = (props) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = {
                    query: keyword,
                };
                response = await tmdbApi.search(props.category, { params });
            }
            // console.log(response);
            setItems(response.results);
            setTotalPage(response.total_pages);
        };
        getList();
    }, [props.category, keyword]);

    const loadMore = () => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = { page: page + 1 };
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = {
                    page: page + 1,
                    query: keyword,
                };
                response = await tmdbApi.search(props.category, { params });
            }
            // console.log(response);
            setItems([...items, ...response.results]);
            setPage(page + 1);
        };
        getList();
    };

    console.log(props.category);

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            <div className={cx('movie-grid')}>
                {items?.map((item, i) => (
                    <MovieItem key={i} category={props.category} item={item} />
                ))}
            </div>
            {page < totalPage ? (
                <div className={cx('movie-grid_loadmore')}>
                    <OutlineButton className="small" onClick={loadMore}>
                        Load more
                    </OutlineButton>
                </div>
            ) : null}
        </>
    );
};

const MovieSearch = (props) => {
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const navigate = useNavigate();

    const gotoSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            navigate(`/${category[props.category]}/search/${keyword}`);
        }
    }, [keyword, props.category, navigate]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                gotoSearch();
            }
        };

        document.addEventListener('keyup', enterEvent);

        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, gotoSearch]);

    return (
        <div className={cx('movie-search')}>
            <Input
                className={cx('input')}
                type="text"
                placeholder="Enter keyword..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={gotoSearch}>
                Search
            </Button>
        </div>
    );
};

export default MovieGrid;
