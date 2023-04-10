import Link from 'next/link' 
import '@/styles/index.css'
import { BsGithub } from 'react-icons/bs';

export default function App({ Component, pageProps }) {
  return <>
    <header>
      <nav className='navbar'>
        <Link href="/">
          <img src="/BookTokLogo.png" alt="BookTok" className='navbar__logo' />
        </Link>

        <ul className='navbar__menu'>
          <li>
            <Link href="/camera"> WebCam</Link>
          </li>

          <li>
            <Link href="/screenshot"> Screenshot</Link>
          </li>

          <li>
            <Link href="/video"> Video</Link>
          </li>

          <li>
            <Link href="/mic"> Mic Recorder</Link>
          </li>

          <li>
            <Link href="/dual-camera"> Front & Back Camera</Link>
          </li>
        </ul>

        <ul className='navbar__icons'>
          <li>
            <a href="https://github.com/fiorelaem/BookTok_Tech_Share"><BsGithub /></a>
          </li>
        </ul>
      </nav>
    </header>

    <Component {...pageProps} />  
  </>
}
