import { createFileRoute } from '@tanstack/react-router'
import Navbar from '../components/Navbar'
import NewsDetail from '../components/NewsDetail'


export const Route = createFileRoute('/detail')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
        <Navbar />
        <NewsDetail />
        </>
    );
}