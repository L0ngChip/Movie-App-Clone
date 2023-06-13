import './App.scss';
import '~/assets/boxicons-2.0.7/css/boxicons.min.css';
import 'swiper/swiper-bundle.min.css';
import { Route, Routes } from 'react-router-dom';

import Public from './pages/Public';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog';
import { Details } from './pages/Details';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Account } from './pages/Account';

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<Account />} />
                <Route path="" element={<Public />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/:category/search/:keyword" element={<Catalog />} />
                    <Route path="/:category" element={<Catalog />} />
                    <Route path="/:category/:id" element={<Details />} />
                    <Route path="/:category/:category/:id" element={<Details />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
