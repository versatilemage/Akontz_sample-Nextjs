import React from 'react'
import PageBanner from '../components/Common/PageBanner'
// import LoginForm from '../components/Authentication/LoginForm'
import RegisterForm from '../components/Authentication/RegisterForm'

const SigningUp = () => {
    return (
        <>
            <PageBanner 
                pageTitle="Register" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Register" 
            />

            <div className="profile-authentication-area ptb-100">
                <div className="container">
                    <div className="row form_centering">
                        {/* <div className="col-lg-6 col-md-12"> */}
                            {/* <LoginForm /> */}
                        {/* </div> */}

                        <div className="col-lg-8 col-md-12">
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SigningUp;
