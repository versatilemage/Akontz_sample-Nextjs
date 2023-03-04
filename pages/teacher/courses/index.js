import React from 'react'
import { parseCookies } from 'nookies'
import { useSelector } from 'react-redux'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import CourseCard from '@/components/Courses/CourseCard'
import PageBanner from '@/components/Common/PageBanner'
import Link from '@/utils/ActiveLink'
import AdminLeftDashboard from '@/components/_App/AdminLeftDashboard'
import SuperAdminLeftDashboard from '@/components/_App/SuperAdminLeftDashboard'
import TeacherLeftDashboard from '@/components/_App/TeacherleftDashBoard';

const index = ({ courses }) => {
    // console.log(courses)
    const userData = useSelector((state) => state.userData);
    const userRole = userData?.userInfo?.role;


    return (
        <React.Fragment>
            <PageBanner 
                pageTitle="My Courses" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="My Courses" 
            />

            <div className="courses-area courses-section pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-lg-4">
                            {userRole === "superAdmin" 
                                ? 
                                <SuperAdminLeftDashboard/> 
                                : 
                                (userRole === "admin" 
                                ? 
                                <AdminLeftDashboard/> 
                                : 
                                (userRole === "teacher"
                                ? <TeacherLeftDashboard/>
                                :
                                null))}
                        </div>

                        <div className="col-md-8 col-lg-8">
                            <div className="row">
                                {courses?.length ? courses.map(course => (
                                    <CourseCard {...course} key={course.id} order={true} />
                                )) : (
                                    <div className="col-lg-12">
                                        <h3 className="empty-content">Empty</h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>  
    )
}

index.getInitialProps = async ctx => {
    const { token } = parseCookies(ctx)
    if(!token){
        return {courses: []}
    }

    const payload = {
        headers: {Authorization: token}
    }

    const url = `${baseUrl}/api/v1/courses/my-courses`
    const response = await axios.get(url, payload)
    // console.log(response.data)
    return response.data
}

export default index
