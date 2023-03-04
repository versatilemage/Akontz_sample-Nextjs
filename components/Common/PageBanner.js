import React from 'react';
import Link from 'next/link';

const PageBanner = ({pageTitle, homePageUrl, homePageText, activePageText}) => {
    return (
        <>
            <div className="page-title-area">
                <div className="container">
                    <div className="page-title-content">
                        <ul>
                            <li>
                                <Link href={homePageUrl}>
                                    <a>{homePageText}</a>
                                </Link>
                            </li>
                            <li className="active">{activePageText}</li>
                        </ul>

                        <h2>{pageTitle}</h2>
                    </div>
                </div>
                <div className="bottom-whole_img-container">
						<div className="main-banner-image-style-two-pageTitle">
							<img src="/images/banner-shape7.png" alt="image" className="main-banner-paper-rocket_image"/>
							<img src={pageTitle == "Register" || pageTitle == "Login" ?
                             "/images/Signup.png":
                             (pageTitle == "Contact" || pageTitle == "Cart" || pageTitle == "Checkout" ? 
                             "/images/contact_us_banner.png":
                             (pageTitle == "Blog" ?
                              "/images/Blog_banner.png":((pageTitle == "My Courses" || pageTitle == "CIMA Courses") 
                              ? "/images/Course_overview.png": (pageTitle == "About Us" 
                              ? "/images/About_us-banner.png" : ((pageTitle == "Instructor Dashboard" ? "/images/about-img1.png": "/images/about-img3.png"))))))} alt="image" className="main-banner-discussion_image"/>
						</div>
                        {/* <div className="banner-shape1">
                        pageTitle == "Contact"
                        /images/about-img3.png
                            <img src="/images/banner-shape1.png" alt="image" />
                        </div> */}
				</div>
            </div>
            {/* <div className="shape9">
                <img src="/images/shape8.svg" alt="image" />
            </div> */}
        </>
    );
}

export default PageBanner;