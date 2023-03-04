import React from "react";
import Link from "next/link";
// import useTranslation from "next-translate/useTranslation";

const Features = () => {
	// const { t } = useTranslation("distance-learning");
	return (
		<div className="features-area pt-100 pb-70 bg-fff8f8">
			<div className="aboutus_container container">
				<div className="main-banner-image-style-two">
					<img src="/images/about.png" alt="Women with book" className="woman-with_book_image"></img>
				</div>
				<div className="Features-Text_button-Container">
					<h1>About Us</h1>
					<p>
					Access to high quality education in accounts and finance verticals is the call of the day. The objective of Akontz is to be an enabler of higher education in accounting and finance to students as well as to those who have stopped to upgrade themselves once they got into employment.
					<br/><br/>
 					It is the time for people employed in the finance and accounts sphere to upskill themselves through courses that are made bespoke for them. Akontz brings to students an entire suite of high-quality accountancy and finance courses through an online platform. It is convenient, interactive, time saving, affordable and flexible to study at leisure.
					 {/* <br/><br/>
 					Students can make their own study plan to acquire a professional finance and accountancy accreditation.
					 <br/><br/>
 					With experienced and qualified teachers, engaging content and interactive technology, Akontz is here to give a superior learning experience to students and transform them into a top-notch finance professional. */}
					</p>
					<Link href="/about-1">
						<a className="default-btn">
							<i className="flaticon-agenda"></i>
								Read More
							<span></span>
						</a>
					</Link>
				</div>
				{/* <div className="section-title">
					<span className="sub-title">
					EDUCATION FOR EVERYONE
					</span>
					<h2>Online Coaching Lessons For Remote Learning​</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
				</div> */}
				{/* <div className="row justify-content-center">
					<div className="col-lg-4 col-sm-6 col-md-6">
						<div className="features-box">
							<div className="icon">
								<i className="flaticon-brain-process"></i>
							</div>
							<h3>Learn the Latest Skills</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
							<Link href="/authentication">
								<a className="link-btn">Start Now!</a>
							</Link>
							<div className="back-icon">
								<i className="flaticon-brain-process"></i>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6 col-md-6">
						<div className="features-box">
							<div className="icon">
								<i className="flaticon-shield-1"></i>
							</div>
							<h3>Learn from Industry Experts</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
							<Link href="/authentication">
								<a className="link-btn">Start Now!</a>
							</Link>
							<div className="back-icon">
								<i className="flaticon-shield-1"></i>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6 col-md-6">
						<div className="features-box">
							<div className="icon">
								<i className="flaticon-world"></i>
							</div>
							<h3>Learn From Anywhere</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
							<Link href="/authentication">
								<a className="link-btn">Start Now!</a>
							</Link>
							<div className="back-icon">
								<i className="flaticon-world"></i>
							</div>
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default Features;
