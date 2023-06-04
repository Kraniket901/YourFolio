import '@/styles/globals.css'
import '@/public/assets/css/style.css'
import '@/public/static/plugin/bootstrap/css/bootstrap.min.css'
import '@/public/static/plugin/font-awesome/css/all.min.css'
import '@/public/static/plugin/et-line/style.css'
import '@/public/static/plugin/themify-icons/themify-icons.css'
// import '@/public/static/plugin/owl-carousel/css/owl.carousel.min.css'
import '@/public/static/plugin/magnific/magnific-popup.css'
// import '@/public/static/plugin/scroll/jquery.mCustomScrollbar.min.css'
import '@/public/static/css/style.css'
// // add bootstrap css 
// import 'bootstrap/dist/css/bootstrap.css'

import { SessionProvider } from "next-auth/react"

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}
