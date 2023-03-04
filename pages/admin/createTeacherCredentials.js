import React from "react";
import PageBanner from "@/components/Common/PageBanner";
import TeacherRegisterForm from "@/components/Authentication/teacherRegisterForm";

const createTeacherCred = () => {
    return (
        <React.Fragment>
            <PageBanner 
                pageTitle="create Instructor" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="create Instructor" 
            />

            <div className="profile-authentication-area ptb-100">
                <div className="container">
                    <div className="row form_centering">
                        {/* <div className="col-lg-6 col-md-12"> */}
                            {/* <LoginForm /> */}
                        {/* </div> */}
                        
                        <div className="col-lg-8 col-md-12">
                            <TeacherRegisterForm />
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default createTeacherCred;

