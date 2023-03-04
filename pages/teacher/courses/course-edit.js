import React from 'react'
import { parseCookies } from 'nookies'
import { useSelector } from 'react-redux'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import PageBanner from '@/components/Common/PageBanner'
import Link from '@/utils/ActiveLink'

import AdminLeftDashboard from '@/components/_App/AdminLeftDashboard'
import SuperAdminLeftDashboard from '@/components/_App/SuperAdminLeftDashboard'
import TeacherLeftDashboard from '@/components/_App/TeacherleftDashBoard';

const courseEdit = ({ courses }) => {
    const userData = useSelector((state) => state.userData);
    const userRole = userData?.userInfo?.role;

    return (
        <React.Fragment>
            <PageBanner 
                pageTitle="Course Edit" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Course Edit" 
            /> 

            <div className="ptb-100">
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
                            <div className="table-responsive">
                                <table className="table vertical-align-top">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Courses</th>
                                            <th scope="col" className="text-right">Action</th> 
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {courses?.length ? courses.map(course => (
                                            <tr key={course.id}>
                                                <th scope="row">1</th>
                                                <td>
                                                    {course.title}
                                                </td>
                                                <td className="text-right">
                                                    <Link href="/teacher/course/[id]" as={`/teacher/course/${course.id}`}>
                                                        <a className="btn btn-success">
                                                            <i className='bx bxs-edit'></i> Edit
                                                        </a>
                                                    </Link>
                                                </td> 
                                            </tr>
                                        )): (
                                            <tr className="text-center">
                                                <td colSpan="3">Empty</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

courseEdit.getInitialProps = async ctx => {
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

export default courseEdit
