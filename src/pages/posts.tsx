import Image from 'next/image'
import { Inter } from 'next/font/google'
import Post from '../components/post'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Post />
    </>
  )
}
