import React from 'react';
import Link from "next/link";
// import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import MainBanner from "@/components/Index/MainBanner";
import AboutUs from '../components/About/AboutUs';
import FeedbackSliderWithFunFacts from '../components/About/FeedbackSliderWithFunFacts';
import Features from '../components/About/Features';
import CourseAdvisor from '../components/Common/CourseAdvisor';
import Partner from '../components/Common/Partner';
import PremiumAccess from '../components/Common/PremiumAccess';
import TopCourses from "@/components/Index/TopCourses";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
// import Footer from '../components/_App/Footer';

const About1 = ({ courses }) => {
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            {/* <PageBanner 
                pageTitle="About Us" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="About Us" 
            />   */}
            <MainBanner page={"About Us"}/>
            <CourseAdvisor />
            <Features />
            <TopCourses courses={courses} />
            {/* <AboutUs /> */}
            {/* <FeedbackSliderWithFunFacts /> */}
            {/* <PremiumAccess /> */}
            {/* <Partner /> */}
            {/* <Footer /> */}
        </React.Fragment>
    )
};

export const getServerSideProps = async () => {
	const url = `${baseUrl}/api/v1/courses/homepage-courses`;
	try{
		const response = await axios.get(url);
		return { props: response.data };
	}catch (error) {
		console.error(error);
		return { props: {courses: []} };
	}
};

export default About1;