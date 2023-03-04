import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const ModalVideo = dynamic(import("react-modal-video"));
// import useTranslation from "next-translate/useTranslation";

const Instance = () => {
	// const { t } = useTranslation("distance-learning");
	const [display, setDisplay] = useState(false);
	const [isOpen, setIsOpen] = React.useState(true);
	const openModal = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		setDisplay(true);
	}, []);

	return (
		<>
			{display ? (
				<ModalVideo
					channel="youtube"
					isOpen={!isOpen}
					videoId="bk7McNUjWgw"
					onClose={() => setIsOpen(!isOpen)}
				/>
			) : (
			""
			)}
			<div className="get-instant-courses-area-two bg-f9fbff">
				<div className="container">
					<div className="row align-items-center about_us-message-container">
						<div className="col-lg-7 col-md-12">
							<div className="get-instant-courses-content-style-two">
								<span className="sub-title">
									GET INSTANT ACCESS TO THE FREE
								</span>
								<h2>Build Your Project Management Skills Online, Anytime</h2>
								<p>With The Open University you can study whenever and wherever you choose. We have students in over 128 countries, and a global reputation as a pioneer in the field of flexible learning. Our flexible teaching also means, if you travel often or need to relocate, you can continue to study wherever you go.</p>
								{/* <Link href="/authentication">
									<a className="default-btn">
										<i className="flaticon-user"></i>
										Start For Free
										<span></span>
									</a>
								</Link> */}
							</div>
						</div>
						<div className="col-lg-5 col-md-12 aboutus_video-thumbnail">
							<div className="image">
							<img src={"/images/about-img5.jpg"} alt={"about_image"} />
								<div
									onClick={(e) => {
										e.preventDefault();
										openModal();
									}}
									className="link-btn popup-youtube"
								>
								</div>
								<div className="content">
									<i className="flaticon-play"></i>
									{/* <span>Course Preview</span> */}
								</div>
							</div>
						</div>
					</div>
					<div className="row align-items-center about_us-message-container">
						<div className="col-lg-5 col-md-12 aboutus_video-thumbnail">
							<div className="image">
							<img src={"/images/about-img5.jpg"} alt={"about_image"} />
								<div
									onClick={(e) => {
										e.preventDefault();
										openModal();
									}}
									className="link-btn popup-youtube"
								>
								</div>
								<div className="content">
									<i className="flaticon-play"></i>
									{/* <span>Course Preview</span> */}
								</div>
							</div>
						</div>
						<div className="col-lg-7 col-md-12">
							<div className="get-instant-courses-content-style-two">
								<span className="sub-title">
									GET INSTANT ACCESS TO THE FREE
								</span>
								<h2>Build Your Project Management Skills Online, Anytime</h2>
								<p>With The Open University you can study whenever and wherever you choose. We have students in over 128 countries, and a global reputation as a pioneer in the field of flexible learning. Our flexible teaching also means, if you travel often or need to relocate, you can continue to study wherever you go.</p>
								{/* <Link href="/authentication">
									<a className="default-btn">
										<i className="flaticon-user"></i>
										Start For Free
										<span></span>
									</a>
								</Link> */}
							</div>
						</div>
					</div>
				</div>
				{/* <div className="bulb">
					<img src="/images/bulb2.png" alt="image" />
				</div> */}
			</div>
		</>
	);
};

export default Instance;
