// import '@/styles/globals.css'
import Link from 'next/link' 

export default function App({ Component, pageProps }) {
  return <>
    <Link href="/camera">Camera</Link>
    <br></br>
    <Link href="/screenshot">Screenshot</Link>
    <br></br>
    <Link href="/video">Video</Link>
    <Component {...pageProps} />  
  </>
}
