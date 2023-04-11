import Image from 'next/image'
import { Inter } from 'next/font/google'
import FrontPage from '../components/frontpage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <FrontPage />
    </>
  )
}
