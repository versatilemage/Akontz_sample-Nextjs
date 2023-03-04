import React from "react";
import PageBanner from "@/components/Common/PageBanner";
import AdminRegisterForm from "@/components/Authentication/adminRegisterForm";

const createAdminCred = () => {
    return (
        <React.Fragment>
            <PageBanner 
                pageTitle="Create Admin" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Create Admin" 
            />

            <div className="profile-authentication-area ptb-100">
                <div className="container">
                    <div className="row form_centering">
                        {/* <div className="col-lg-6 col-md-12"> */}
                            {/* <LoginForm /> */}
                        {/* </div> */}
                        
                        <div className="col-lg-8 col-md-12">
                            <AdminRegisterForm />
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default createAdminCred;

