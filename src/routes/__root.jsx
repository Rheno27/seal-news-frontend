import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useState } from "react";
import Beranda from '../components/Beranda';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

export const Route = createRootRoute({
    component: () => {
        const [category, setCategory] = useState('hiburan');
        console.log('Current category in Route:', category);
    
        return (
            <>
            <Navbar setCategory={setCategory} />
            <Beranda category={category} />
            <Banner />
            <Footer />
            <TanStackRouterDevtools />
            </>
        );
        },
});