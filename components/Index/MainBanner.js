import React from "react";
import Link from "next/link";
// import useTranslation from "next-translate/useTranslation";

const MainBanner = ({page}) => {
	// const { t } = useTranslation("distance-learning");
	return (
		<div className="main-banner-area">
			<div className="container-fluid">
				<div className="row align-items-center">
					<div className="col-lg-6 col-md-12">
						<div className="main-banner-content-style-two">
							{page == "Home" ? 
							<>
								<h1>Smarter option to accomplish your professional accounting qualifications.</h1>
								<p>
									Acquiring CIMA, ACCA qualifications made easy, 
									Transforming students to professionals.
								</p>
							</>
							:
							<>
								{/* <h1>Project Management Certification Training</h1> */}
								<p>
									To partner with students and accountants 
									for their best online learning experience 
									in professional accounting courses.
								</p>
							</>
							}
							<Link href="/authentication">
								<a className="default-btn">
									<i className="flaticon-user"></i>
										Join Us Now
									<span></span>
								</a>
							</Link>
						</div>
					</div>
					<div className="col-lg-6 col-md-12">
						<div className="main-banner-image-style-two">
							<img src="/images/banner-shape7.png" alt="image" className="main-banner-paper-rocket_image"/>
							<img src={page == "Home" ? "/images/Home_page_banner.png": "/images/About_us-banner.png"} alt="image" className="main-banner-discussion_image"/>
						</div>
					</div>
				</div>
			</div>
			<div className="banner-shape1">
				<img src="/images/banner-shape1.png" alt="image" />
			</div>
			<div className="banner-shape2">
				<img src="/images/banner-shape2.png" alt="image" />
			</div>
			<div className="banner-shape3">
				<img src="/images/banner-shape3.png" alt="image" />
			</div>
		</div>
	);
};

export default MainBanner;
