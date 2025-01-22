import { createLazyFileRoute } from '@tanstack/react-router'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Detail from '../../components/Detail'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const Route = createLazyFileRoute('/detail/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [category, setCategory] = useState('beranda')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const title = searchParams.get('title')
  const pubDate = searchParams.get('pubDate')
  const description = searchParams.get('description')
  const thumbnail = searchParams.get('thumbnail')
  const categoryParam = searchParams.get('category') || 'beranda'

  useEffect(() => {
    console.log('Title yang diambil dari URL di detail title:', title)
    if (!title) {
      navigate('/') // Jika title tidak ada di query, kembali ke halaman utama
    }
  }, [title, navigate])

  const newsDetail = {
    title,
    pubDate,
    description,
    thumbnail,
    category: categoryParam === 'beranda' ? 'terbaru' : categoryParam,
  }

  console.log('newsDetail yang diterima di detail title:', newsDetail)
  
  return (
    <>
      <Navbar setCategory={setCategory} category={category} />
      <Detail newsDetail={newsDetail} />
      <Footer />
    </>
  )
}
