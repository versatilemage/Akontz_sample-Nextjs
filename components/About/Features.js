import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Features = () => {
    const userData = useSelector((state) => state.userData)
    // console.log(userData?.userInfo?.active)
    const activeUser = userData?.userInfo?.active
    return (
        <div className="features-area ptb-10">
            <div className="container">
                {/* <div className="section-title">
                    <span className="sub-title">Education for everyone</span>
                    <h2>Affordable Online Courses and Learning Opportunities​</h2>
                    <p>Finding your own space and utilize better learning options can result in faster than the traditional ways. Enjoy the beauty of eLearning!</p>
                </div> */}

                <div className="row">
                    <div className="col-lg-4 col-sm-6 col-md-6">
                        <div className="single-features-box">
                            {/* <div className="icon">
                                <i className="flaticon-brain-process"></i>
                            </div> */}
                            <h3>OUR MISSION</h3>
                            {/* <h3>Learn the Latest Top Skills</h3> */}
                            <p>
                                AKONTZ aims to be a facilitator to students who are in 
                                their way to enhance their accounting and financial 
                                skills and are pursuing their dream career path.
                            </p>

                            {/* <Link href={activeUser ? "/courses" : "/authentication"}>
                                <a className="link-btn">Start Now!</a>
                            </Link> */}
                        </div>
                    </div>

                    {/* <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="single-features-box">
                            <div className="icon">
                                <i className="flaticon-computer"></i>
                            </div>
                            <h3>Learn in Your Own Pace</h3>
                            <p>Everyone prefers to enjoy learning at their own pace & that gives a great result.</p>
                           
                            <Link href="/profile-authentication">
                                <a className="link-btn">Start Now!</a>
                            </Link>
                        </div>
                    </div> */}

                    <div className="col-lg-4 col-sm-6 col-md-6">
                        <div className="single-features-box">
                            {/* <div className="icon">
                                <i className="flaticon-shield-1"></i>
                            </div> */}
                            <h3>OUR GOAL</h3>
                            <p>AKONTZ adopts the UN SDG Goal no.4 Quality 
                                Education by ensuring inclusive and equal education 
                                to all and also to involve deeply in promoting lifelong 
                                learning opportunities to those who pursue upskilling 
                                themselves.
                            </p>
                            <p>
                                AKONTZ in particular aligns with Target 4.3 - equal access to 
                                affordable technical, vocational and higher education and Target 4.4 to increase the 
                                number of people with relevant skills for financial success.
                            </p>
                            
                            {/* <Link href="/profile-authentication">
                                <a className="link-btn">Start Now!</a>
                            </Link> */}
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6 col-md-6">
                        <div className="single-features-box">
                            <h3>OUR VISION</h3>
                            {/* <div className="icon">
                                <i className="flaticon-world"></i>
                            </div> */}
                            {/* <h3>Enjoy Learning From Anywhere</h3> */}
                            <p>
                                To partner with students for their best online 
                                learning experience in professional accounting courses 
                                offered by professional bodies across the world.
                            </p>
                            
                            {/* <Link href={activeUser ? "/courses" : "/authentication"}>
                                <a className="link-btn">Start Now!</a>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features;