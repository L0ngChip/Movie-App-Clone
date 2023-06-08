import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
const Public = () => {
    return (
        <>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Public;