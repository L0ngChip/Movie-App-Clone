import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { Slider } from '~/components/Slider';
import { OutlineButton } from '~/components/Button/Button';
import { MovieList } from '~/components/MovieList';
import { category, movieType, tvType } from '~/api/tmdbApi';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
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
                    <MovieList rowId="01" category={category.movie} type={movieType.popular} />
                </div>
                <div className={'section mb-3'}>
                    <div className={'section_header mb-2'}>
                        <h2>Top Rated Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList rowId="02" category={category.movie} type={movieType.top_rated} />
                </div>
                <div className={'section mb-3'}>
                    <div className={'section_header mb-2'}>
                        <h2>Trending TV</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList rowId="03" category={category.tv} type={tvType.popular} />
                </div>
                <div className={'section mb-3'}>
                    <div className={'section_header mb-2'}>
                        <h2>Top Rated TV</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList rowId="04" category={category.tv} type={tvType.top_rated} />
                </div>
            </div>
        </>
    );
};

export default Home;
