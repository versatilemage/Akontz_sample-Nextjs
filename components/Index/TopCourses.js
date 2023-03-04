import React from "react";
import Link from "next/link";
// import useTranslation from "next-translate/useTranslation";

const TopCourses = ({ courses }) => {
	console.log("courses from common", courses)
	// const { t } = useTranslation("distance-learning");
	return (
		<div className="courses-area ptb-100">
			<div className="container">
				<div className="section-title">
					{/* <span className="sub-title">{t("course-top-text")}</span> */}
					<h2>CIMA Courses</h2>
					<p style={{textAlign: "center"}}>
						Explore all of our courses and pick your suitable ones to enroll and start learning with us! We ensure that you will never regret it
					</p>
				</div>

				<div className="row">
					{courses ? (
						courses.map((course) => (
							<div className="col-lg-3 col-md-12" key={course.id}>
								<div className="single-courses-box">
									<div className="courses-image">
										<Link
											href="/courses/[id]"
											as={`/courses/${course.id}`}
										>
											<a className="d-block image">
												<img
													src={course.profilePhoto}
													alt={course.title}
												/>
											</a>
										</Link>

										<Link href="#">
											<a className="fav">
												<i className="flaticon-heart"></i>
											</a>
										</Link>

										<div className="price shadow">
											₹{course.price}
										</div>
									</div>

									<div className="courses-content">
										<div className="course-author d-flex align-items-center">
											<img
												src={`${
													course.user.profilePhoto
														? course.user
																.profilePhoto
														: "/images/akontz_course-logo.jpg"
												}`}
												className="rounded-circle"
												alt={course.user.name}
											/>
											<span>{course.category}</span>
										</div>

										<h3 title={course.title.slice(0, 40)}>
											<Link
												href="/courses/[id]"
												as={`/courses/${course.id}`}
											>
												<a>
													{course.title.length > 40 ? 
													`${course.title.slice(0, 40)}...`: course.title}
												</a>
											</Link>
										</h3>

										<p>
											{course.overview.length > 100 ? 
											`${course.overview.slice(0, 100)}...`: course.overview}
										</p>

										<ul className="courses-box-footer d-flex justify-content-between align-items-center">
											<li>
												<i className="flaticon-agenda"></i>{" "}
												{parseInt(course.lessons)}{" "}
												Chapters
											</li>
											<li>
												{/* <i className="flaticon-people"></i>{" "}
												{course.enroled_courses.length}{" "}
												Students */}
											</li>
										</ul>
									</div>
								</div>
							</div>
						))
					) : (
						<h2>Empty</h2>
					)}

					{/* <div className="col-lg-12 col-md-12">
						<div className="courses-info">
							<p>
								{t("course-description2")}{" "}
								<Link href="/authentication">
									<a>{t("join-free-now")}</a>
								</Link>
								.
							</p>
						</div>
					</div> */}
					<div className="index-courses_container">
						<Link href="/courses">
								<a className="default-btn">
								<i className="flaticon-agenda"></i>
										View all courses
									<span></span>
								</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopCourses;
