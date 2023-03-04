import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonials = () => {
	return (
		<div className="testimonials-area ptb-100">
			<div className="container">
				<div className="section-title">
					{/* <span className="sub-title">Testimonials</span> */}
					<h2>OUR OBJECTIVE</h2>
					{/* <p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua.
					</p> */}
				</div>

				<div className="testimonials-slides owl-carousel owl-theme">
					{/* <SwiperSlide> */}
						<div className="single-testimonials-item">
							<img
								src="/images/our-objective.jpg"
								className="client-img"
								alt="image"
							/>
							<p>
							The objective of AKONTZ is to be a facilitator to students to accomplish their dream to be a qualified finance professional through various online finance and accounts courses offered online.
							<br/><br/>
							Courses offered by AKONTZ are easy to understand, flexible, and prepares students exam- ready faster.
							</p>
							{/* <h3>John Smith</h3>
							<span>Python Developer</span> */}

							<div className="shape-img">
								<img
									src="/images/shape4.png"
									className="shape-1"
									alt="image"
								/>
								<img
									src="/images/shape14.png"
									className="shape-2"
									alt="image"
								/>
								<img
									src="/images/shape7.png"
									className="shape-3"
									alt="image"
								/>
							</div>
						</div>
					{/* </SwiperSlide> */}
					{/* <SwiperSlide>
						<div className="single-testimonials-item">
							<img
								src="/images/user2.jpg"
								className="client-img"
								alt="image"
							/>
							<p>
								The objective of AKONTZ is to be a facilitator to students to accomplish their dream to be a qualified finance professional through various online finance and accounts courses offered online.
								<br/><br/>
								Courses offered by AKONTZ are easy to understand, flexible, and prepares students exam- ready faster.
							</p>

							<div className="shape-img">
								<img
									src="/images/shape4.png"
									className="shape-1"
									alt="image"
								/>
								<img
									src="/images/shape14.png"
									className="shape-2"
									alt="image"
								/>
								<img
									src="/images/shape7.png"
									className="shape-3"
									alt="image"
								/>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="single-testimonials-item">
							<img
								src="/images/user3.jpg"
								className="client-img"
								alt="image"
							/>
							<p>
								The objective of AKONTZ is to be a facilitator to students to accomplish their dream to be a qualified finance professional through various online finance and accounts courses offered online.
								<br/><br/>
								Courses offered by AKONTZ are easy to understand, flexible, and prepares students exam- ready faster.
							</p>

							<div className="shape-img">
								<img
									src="/images/shape4.png"
									className="shape-1"
									alt="image"
								/>
								<img
									src="/images/shape14.png"
									className="shape-2"
									alt="image"
								/>
								<img
									src="/images/shape7.png"
									className="shape-3"
									alt="image"
								/>
							</div>
						</div>
					</SwiperSlide> */}
				</div>
			</div>
		</div>
	);
};

export default Testimonials;
