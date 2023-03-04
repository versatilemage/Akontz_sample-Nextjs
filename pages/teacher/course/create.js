import React from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import { Spinner } from 'reactstrap'
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import baseUrl from '@/utils/baseUrl'
import catchErrors from '@/utils/catchErrors'
import PageBanner from '@/components/Common/PageBanner'
import Link from '@/utils/ActiveLink'
import SuperAdminLeftDashboard from '@/components/_App/SuperAdminLeftDashboard'
import AdminLeftDashboard from '@/components/_App/AdminLeftDashboard';
import TeacherLeftDashboard from '@/components/_App/TeacherleftDashBoard';

const INIT_COURSE = {
    title: '',
    overview: '',
    price: 0.00,
    profilePhoto: '',
    published: true,
    coverPhoto: '',
    course_preview_img: '',
    course_preview_video: '',
    duration: '',
    lessons: '',
    category: '',
}

const Create = () => {
    const { token } = parseCookies()
    const router = useRouter()
    const userData = useSelector((state) => state.userData)
    const userRole = userData?.userInfo?.role

    const [course, setCourse] = React.useState(INIT_COURSE)
    const [profilePreview, setProfilePreview] = React.useState('')
    const [coverPhotoPreview, setCoverPhotoPreview] = React.useState('')
    const [coursePreviewImg, setCoursePreviewImg] = React.useState('')
    const [imageUploading, setImageUploading] = React.useState(false)

    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(true)
    const [error, setError] = React.useState()

    React.useEffect(() => {
        const isCourse = Object.values(course).every(el => Boolean(el))
        isCourse ? setDisabled(false) : setDisabled(true)
    }, [course])

    const handleChange = e => {
        const { name, value, files } = e.target

        if(name === 'profilePhoto'){
            const profilePhotoSize = files[0].size / 1024 / 1024
            if(profilePhotoSize > 2){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'The profile photo size greater than 2 MB. Make sure less than 2 MB.',
                  })
                e.target.value = null
                return
            }
            setCourse(prevState => ({ ...prevState, profilePhoto: files[0]}))
            setProfilePreview(window.URL.createObjectURL(files[0]))
        } else if (name === 'coverPhoto'){
            const coverPhotoSize = files[0].size / 1024 / 1024
            if(coverPhotoSize > 2){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'The cover photo size greater than 2 MB. Make sure less than 2 MB.',
                  })
                e.target.value = null
                return
            }
            setCourse(prevState => ({ ...prevState, coverPhoto: files[0]}))
            setCoverPhotoPreview(window.URL.createObjectURL(files[0]))
        } else if (name === 'course_preview_img'){
            const course_preview_img = files[0].size / 1024 / 1024
            if(course_preview_img > 2){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'The course preview omage size greater than 2 MB. Make sure less than 2 MB.',
                  })
                e.target.value = null
                return
            }
            setCourse(prevState => ({ ...prevState, course_preview_img: files[0]}))
            setCoursePreviewImg(window.URL.createObjectURL(files[0]))
        }
        else {
            setCourse(prevState => ({ ...prevState, [name]: value }))
        }
    }

    const handleProfilePhotoUpload = async () => {
        setImageUploading(true)
        const data = new FormData()
        data.append('file', course.profilePhoto)
        data.append('upload_preset', 'vikings')
        data.append('cloud_name', 'dev-empty')
        let response
        if(course.profilePhoto){
            response = await axios.post(process.env.CLOUDINARY_URL, data)
        }
        const profilePhotoUrl = response.data.url

        return profilePhotoUrl
    }

    const handlecoverPhotoUpload = async () => {
        setImageUploading(true)
        const data = new FormData()
        data.append('file', course.coverPhoto)
        data.append('upload_preset', 'vikings')
        data.append('cloud_name', 'dev-empty')
        let response
        if(course.coverPhoto){
            response = await axios.post(process.env.CLOUDINARY_URL, data)
        }

        const cover_photo_url = response.data.url

        return cover_photo_url
    }

    const handlePreviewPhotoUpload = async () => {
        setImageUploading(true)
        const data = new FormData()
        data.append('file', course.course_preview_img)
        data.append('upload_preset', 'vikings')
        data.append('cloud_name', 'dev-empty')
        let response

        if(course.course_preview_img){
            response = await axios.post(process.env.CLOUDINARY_URL, data)
        }

        const preview_photo_response_url = response.data.url
        setImageUploading(false)
        setLoading(true)
        return preview_photo_response_url
    }

    const handleCourseSubmit = async e => {
        e.preventDefault()
        try {
            let profile = ''
            let cover = ''
            let preview = ''
            if(course.profilePhoto && course.coverPhoto && course.course_preview_img){
                profile = await handleProfilePhotoUpload()
                cover = await handlecoverPhotoUpload()
                preview = await handlePreviewPhotoUpload()

                profile = profile.replace(/^http:\/\//i, 'https://');
                cover = cover.replace(/^http:\/\//i, 'https://');
                preview = preview.replace(/^http:\/\//i, 'https://');
            }

            const url = `${baseUrl}/api/v1/courses/course/new`
            const {
                title,
                overview,
                price,
                published,
                duration,
                lessons,
                category,
                course_preview_video,
            } = course

            const payload = {
                title,
                overview,
                price,
                published,
                duration,
                lessons,
                category,
                profile,
                cover,
                preview,
                course_preview_video,
            }

            const response = await axios.post(url, payload, {
                headers: {Authorization: token}
            })

            console.log(response.data)
            setLoading(false)
            setCourse(INIT_COURSE)
            setProfilePreview('')
            setCoverPhotoPreview('')
            setCoursePreviewImg('')
            Swal.fire(
                `${response.data}`,
                'success'
              )
            router.replace('/teacher/course/upload-course-video')
        } catch (err) {
            catchErrors(err, setError)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error}`,
              })
        } finally {
            setLoading(false)
        }
    }

    return (
        <React.Fragment>
            <PageBanner 
                pageTitle="Create Course" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Create Course" 
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
                            <div className="border-box">
                                {imageUploading && (
                                    <h3 className="loading-spinner">
                                        <div className="d-table">
                                            <div className="d-table-cell">
                                                <Spinner color="primary" /> Image Uploading....
                                            </div>
                                        </div>
                                    </h3>
                                )}
                                {loading && (
                                    <h3 className="loading-spinner">
                                        <div className="d-table">
                                            <div className="d-table-cell"> 
                                                <Spinner color="success" /> Wait....
                                            </div>
                                        </div>
                                    </h3>
                                )}
                                    
                                <form onSubmit={handleCourseSubmit}>
                                    <div className="form-group">
                                        <label>Course Title</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter course title" 
                                            className="form-control" 
                                            name="title"
                                            value={course.title}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Overview</label>
                                        <textarea 
                                            type="text" 
                                            placeholder="Enter course overview" 
                                            className="form-control" 
                                            name="overview"
                                            rows="10" 
                                            value={course.overview}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Price</label>
                                        <input 
                                            type="number" 
                                            placeholder="Enter course price" 
                                            className="form-control" 
                                            name="price"
                                            value={course.price}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Course Chapters</label>
                                        <input 
                                            type="text" 
                                            placeholder="30 Chapters" 
                                            className="form-control" 
                                            name="lessons"
                                            value={course.lessons}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Duration (Whole numbers of hours & minutes)</label>
                                        <input 
                                            type="text" 
                                            placeholder="10 hours 30 minutes" 
                                            className="form-control" 
                                            name="duration"
                                            value={course.duration}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Select Catagory</label>
                                        <select onChange={handleChange} name="category" className="form-control">
                                            <option value={""}>Select Course</option>
                                            <option value={"Certificate Level"}>Certification Level</option>
                                            <option value={"Operational Level"}>Operational Level</option>
                                            <option value={"Management Level"}>Management Level</option>
                                            <option value={"Strategic Level"}>Strategic Level</option>
                                        </select>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Course Profile (<i>Image less than 2 MB & size 750x500</i>)</label>

                                        <br />

                                        <input 
                                            type="file" 
                                            name="profilePhoto"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />

                                        <br />  

                                        <img src={profilePreview} className="mxw-200 mt-20" />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Cover Photo (<i>Image less than 2 MB & size 1920x500</i>)</label>

                                        <br />

                                        <input 
                                            type="file" 
                                            name="coverPhoto"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />

                                        <br />

                                        <img src={coverPhotoPreview} className="mxw-200 mt-20" />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Preview Video URL</label>
                                        <input 
                                            type="text" 
                                            placeholder="https://www.youtube.com/watch?v=Ke90Tje7VS0" 
                                            className="form-control" 
                                            name="course_preview_video"
                                            value={course.course_preview_video}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Preview Image (<i>Image less than 2 MB & size 750x500</i>)</label>

                                        <br />

                                        <input 
                                            type="file" 
                                            name="course_preview_img"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />

                                        <br />

                                        <img src={coursePreviewImg} className="mxw-200 mt-20" />
                                    </div>

                                    <button
                                        className="default-btn" 
                                        disabled={imageUploading || disabled || loading} 
                                        type="submit"
                                    >
                                        <i className='flaticon-right-chevron'></i>
                                        Create
                                        {(imageUploading || loading) ? <Spinner color="success" /> : ''}

                                        <span></span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Create