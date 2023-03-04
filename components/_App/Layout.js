import React from 'react'
import Head from "next/head"
import { Toaster } from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'
import GoTop from './GoTop'
import Navbar from './Navbar'
import Footer from './Footer'
import StudentNavbar from './StudentNavbar'
import AdminNavbar from './AdminNavbar'
import SuperAdminNavbar from './SuperAdminNavbar'
import { getUsersData } from 'store/actions'
// import Preloader from './Preloader'
// import RtlSidebar from './RtlSidebar'
import CookieConsent from "react-cookie-consent";

const Layout = ({ children, user }) => {
    const [loader, setLoader] = React.useState(true)
    React.useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 1000);
    }, [])

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getUsersData(user))
    }, [children])

    Router.events.on('routeChangeStart', () => {
        setLoader(true)
    })
    Router.events.on('routeChangeComplete', () => {
        setLoader(false)
    })
    Router.events.on('routeChangeError', () => {
        setLoader(false)
    })
    
    const isStudent = user && user?.role === 'student'
    const isAdmin = user && user?.role === 'admin'
    const isTeacher = user && user?.role === 'teacher'
    const isSuperAdmin = user && user?.role === 'superAdmin'
    
    return(
        <React.Fragment>
            <Head>
                <title>Akontz Model</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="Akontz Model" />
                <meta name="og:title" property="og:title" content="Akontz Model"></meta>
                <meta name="twitter:card" content="Akontz Model"></meta>
                <link rel="canonical" href={process.env.NODE_ENV === "production" ? 'https://main.d3hmrqufoijtmj.amplifyapp.com' : 'http://localhost:3000'}></link>
            </Head>
    
            {/* {loader && <Preloader />} */}
    
    
                {isStudent ? (
                    <StudentNavbar user={user} />
                ) : (isAdmin || isTeacher) ? (
                    <AdminNavbar user={user} />
                ) : (isSuperAdmin) ? (
                    <SuperAdminNavbar user={user}/>
                ): (
                    <Navbar user={user} />  
                )}
    
                {children}
    
                <GoTop scrollStepInPx="100" delayInMs="10.50" />
    
                <Footer />
    
                {/* <RtlSidebar /> */}
            <Toaster
                placement = 'top-left'
                autodismisstimeout={10000}
                autodismiss="true"
            />
    
            <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </React.Fragment>
    );
    
}

export default Layout;