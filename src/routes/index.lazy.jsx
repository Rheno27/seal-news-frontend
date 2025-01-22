import { createLazyFileRoute } from '@tanstack/react-router'
import Beranda from '../components/Beranda'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import { useState } from 'react'

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [category, setCategory] = useState('beranda')

  return (
    <>
      <Navbar setCategory={setCategory} category={category} />
      <Beranda newCategory={category} />
      <Banner />
      <Footer />
    </>
  )
}
