import React, {useState, useEffect} from 'react'
import Link from 'next/link'

const CoursesCurriculum = ({ videos, id, user }) => {
    const [reDirect, setReDirect] = useState(false)

    const filterPurchasedCourses = (i) => {
        if(id?.id === i?.courseId){
            return i
        }
    }

    useEffect(() => {
        if(user?.enroled_courses?.length){
            const ifpresent = user?.enroled_courses.filter(filterPurchasedCourses)
            return (ifpresent?.length > 0 ?setReDirect(true):setReDirect(false))
        }
    }, [user])


    return (
        <div className="courses-curriculum">
            {videos ? (
                <ul>
                    {videos.map(video => (
                        <>
                        <li key={video.id}>
                            <Link href={reDirect ? "/sample/[id]":"/courses"} as={reDirect ? `/sample/${id.id}`:""}>
                                <a 
                                    className="d-flex justify-content-between align-items-center"
                                    // onClick={e => e.preventDefault()}
                                >
                                    <span className="courses-name">{video.name}</span>
                                    <div className="courses-meta">
                                        <span className="status locked"><i className={reDirect ? "flaticon-play": "flaticon-password"}></i></span>
                                    </div>
                                </a>
                            </Link>
                        </li>
                        <li key={video.id}>
                            <Link href={reDirect ? "/sample/[id]":"/courses"} as={reDirect ? `/sample/${id.id}`:""}>
                                <a 
                                    className="d-flex justify-content-between align-items-center"
                                    // onClick={e => e.preventDefault()}
                                >
                                    <span className="courses-name">{`Notes`}</span>
                                    <div className="courses-meta">
                                        <span className="status locked"><i className={reDirect ? "flaticon-play": "flaticon-password"}></i></span>
                                    </div>
                                </a>
                            </Link>
                        </li>
                        </>
                        
                    ))}
                </ul>
            ) : (
                <h3>No Videos</h3>
            )}
        </div>
    )
}

export default CoursesCurriculum
