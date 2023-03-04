import React from 'react';
// import Navbar from '../components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
 
// import Footer from '../components/_App/Footer';

const EditProfile = () => {
    const handleChange = () => {

    }
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                pageTitle="Edit Profile" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Edit Profile" 
            />  

            <div className="ptb-100">
                <div className="container">
                    <div className="border-box">
                        <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" id="email" />
                            </div> 

                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" id="email" />
                            </div>

                            <div className="form-group">
                                <label>Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="age"
                                    name="age"
                                    // value={user.age}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Education Details</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Education details"
                                    name="eduDetails"
                                    // value={user.eduDetails}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Occupational status</label><br/>
                                    <div className="occupation_radio-container">
                                        <label for="student">
                                            <input type="radio" id="student" name="occupation" value="student" onChange={handleChange}/>
                                            Student
                                        </label>
                                        
                                        <label for="employed">
                                            <input type="radio" id="employed" name="occupation" value="employed" onChange={handleChange}/>
                                            Employed
                                        </label>
                                        
                                        <label for="professional">
                                            <input type="radio" id="professional" name="occupation" value="professional" onChange={handleChange}/>
                                            Professional
                                        </label>
                                    </div>
                            </div>

                            <button type="submit" className="default-btn mt-10">
                                <i className='flaticon-right-chevron'></i> Update

                                <span></span>
                            </button> 
                        </form>
                    </div>
                </div>
            </div>
          
            {/* <Footer /> */}
        </React.Fragment>
    )
}

export default EditProfile;