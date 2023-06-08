import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';
import { Slider } from '~/components/Slider';
import { OutlineButton } from '~/components/Button/Button';
import { MovieList } from '~/components/MovieList';
import { category, movieType, tvType } from '~/api/tmdbApi';

const cx = classNames.bind(styles);
const Home = () => {
    return (
        <>
            <Slider />
            <div className={'container'}>
                <div className={'section mb-3'}>
                    <div className={'section_header mb-2'}>
                        <h2>Trending Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular} />
                </div>
                <div className={'section mb-3'}>
                    <div className={'section_header mb-2'}>
                        <h2>Top Rated Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated} />
                </div>
                <div className={'section mb-3'}>
                    <div className={'section_header mb-2'}>
                        <h2>Trending TV</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={movieType.popular} />
                </div>
                <div className={'section mb-3'}>
                    <div className={'section_header mb-2'}>
                        <h2>Top Rated TV</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={movieType.top_rated} />
                </div>
            </div>
        </>
    );
};

export default Home;
