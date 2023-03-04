import React from "react";
import Link from "next/link";
// import useTranslation from "next-translate/useTranslation";
import MainBanner from "@/components/Index/MainBanner";
import Features from "@/components/Index/Features";
import TopCourses from "@/components/Index/TopCourses";
import About from "@/components/Index/About";
import Testimonials from "@/components/Index/Testimonials";
import Instance from "@/components/Index/Instance";
import Partner from "@/components/Index/Partner";
import Ad from "@/components/Index/Ad";
import Funfacts from "@/components/Index/Funfacts";
import Blog from "@/components/Index/Blog";
import EdemyPremium from "@/components/Index/EdemyPremium";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import SEO from "@/components/SEO";

const Index = ({ courses }) => {
	// const { t } = useTranslation("distance-learning");
	return (
		<>
			<SEO title={"The World's Leading Distance-Learning Provider"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse."} />
			<MainBanner page={"Home"}/>
			<Features />
			{/* <About /> */}
			<Testimonials />
			<TopCourses courses={courses} />
			<Instance />
			{/* <Partner /> */}
			{/* <Ad /> */}
			{/* <Funfacts /> */}
			<Blog />
			{/* <EdemyPremium /> */}
		</>
	);
};

// Index.getInitialProps = async () => {
// 	const url = `${baseUrl}/api/v1/courses/homepage-courses`;
// 	try {
// 		const response = await axios.get(url);
// 		return response.data;
// 	} catch (error) {
// 		console.error(error);
// 		return { courses: [] };
// 	}
// };

export const getServerSideProps = async () => {
	const url = `${baseUrl}/api/v1/courses/homepage-courses`;
	try{
		const response = await axios.get(url);
		return { props: response.data };
	}catch (error) {
		console.error(error);
		return { props: {courses: []} };
	}
	// const response = await axios.get(url);
	// // console.log("response", response)
	// console.log(process.env.JWT_SECRET)
	// return { props: response.data };
};

export default Index;
