import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import CourseCard from '@/components/Courses/CourseCard'

const Index = ({ courses }) => {
    const filterOperation = (e) => {
        if(e.category == "Operational Level"){
            return e
        }
    }

    const filterCertificate = (e) => {
        if(e.category == "Certificate Level"){
            return e
        }
    }

    const filterManagement = (e) => {
        if(e.category == "Management Level"){
            return e
        }
    }

    const filterStrategic = (e) => {
        if(e.category == "Strategic Level"){
            return e
        }
    }

    const OperationalFilter = courses.filter(filterOperation)
    const CertificateFilter = courses.filter(filterCertificate)
    const ManagementFilter = courses.filter(filterManagement)
    const StrategicFilter = courses.filter(filterStrategic)
    
    return (
        <React.Fragment>
            <PageBanner
                pageTitle="CIMA Courses" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="CIMA Courses" 
            />

            <div className="courses-area courses-section pt-100 pb-70">
                <div className="container">
                    <div className="align-items-center course-Heading_container">
                        <h2>CERTIFICATE LEVEL</h2>
                    </div>

                    <div className="row">

                        {CertificateFilter?.length ? CertificateFilter.map(course => (
                            <CourseCard {...course} key={course.id} />
                        )) : (
                            <h1>No courses is currently available under this category</h1>
                        )}

                    </div>
                </div>
                <div className="container">
                    <div className="align-items-center course-Heading_container">
                        <h2>OPERATIONAL LEVEL</h2>
                    </div>

                    <div className="row">

                        {OperationalFilter?.length ? OperationalFilter.map(course => (
                            <CourseCard {...course} key={course.id} />
                        )) : (
                            <h1>No courses is currently available under this category</h1>
                        )}

                    </div>
                </div>
                <div className="container">
                    <div className="align-items-center course-Heading_container">
                        <h2>MANAGEMENT LEVEL</h2>
                    </div>

                    <div className="row">

                        {ManagementFilter?.length ? ManagementFilter.map(course => (
                            <CourseCard {...course} key={course.id} />
                        )) : (
                            <h1>No courses is currently available under this category</h1>
                        )}

                    </div>
                </div>
                <div className="container">
                    <div className="align-items-center course-Heading_container">
                        <h2>STRATEGIC LEVEL</h2>
                    </div>

                    <div className="row">

                        {StrategicFilter?.length ? StrategicFilter.map(course => (
                            <CourseCard {...course} key={course.id} />
                        )) : (
                            <h1>No courses is currently available under this category</h1>
                        )}

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

Index.getInitialProps = async () => {
    const url = `${baseUrl}/api/v1/courses`
    const response = await axios.get(url)
    // console.log(response)
    return response.data
}

export default Index;