import React from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import { Alert } from 'reactstrap'
import baseUrl from '@/utils/baseUrl'
import { Spinner } from 'reactstrap'
import { useSelector } from 'react-redux'
// import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2';
import catchErrors from '@/utils/catchErrors'
import PageBanner from '@/components/Common/PageBanner'
import Link from '@/utils/ActiveLink'
import SuperAdminLeftDashboard from '@/components/_App/SuperAdminLeftDashboard'
import AdminLeftDashboard from '@/components/_App/AdminLeftDashboard';
import TeacherLeftDashboard from '@/components/_App/TeacherleftDashBoard';


const INIT_VIDEO = {
    video_url: '',
    order: 1,
    name: '',
    description: '',
    courseId: '',
    PDFfile: '',
    chapter: 1,
    chapterName: '',
}

const UploadCourseVideo = ({ courses }) => {
    // console.log(courses)
    const { token } = parseCookies()

    const [video, setVideo] = React.useState(INIT_VIDEO)
    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(true)
    const [videoCount, setVideoCount] = React.useState(0)
    const userData = useSelector((state) => state.userData)
    const userRole = userData?.userInfo?.role

    React.useEffect(() => {
        const {order, PDFfile, name} = video
        const isPDF = Object.values({
            PDFfile,
            name,
            order
        }).every(el => Boolean(el));
        isPDF ? setDisabled(false) : setDisabled(true);
    }, [video])

    const handleVideoUpload = async () => {
        // console.log(post.file_url)
        const data = new FormData()
        data.append('file', video.video_url)
        data.append('upload_preset', 'vikingsvideo')
        data.append('cloud_name', 'dev-empty')
        const response = await axios.post(process.env.CLOUDINARY_VIDEO_URL, data);
        const mediaUrl = response.data.url
        return mediaUrl
    }

    // const handlePDFupload = async () => {
    //     // console.log(post.file_url)
    //     const data = new FormData()
    //     data.append('file', video.PDFfile)
    //     data.append('upload_preset', 'vikings')
    //     data.append('cloud_name', 'dev-empty')
    //     let response = await axios.post(process.env.CLOUDINARY_URL, data)
    //     const PDF = response.data.url
    //     return PDF
    // }

    // const handlePDFupload = async () => {
    //     let PDFs = []
    //     for (let i = 0; i < video.PDFfile.length; i++) {
    //       const data = new FormData()
    //       data.append('file', video.PDFfile[i])
    //       data.append('upload_preset', 'vikings')
    //       data.append('cloud_name', 'dev-empty')
    //       let response = await axios.post(process.env.CLOUDINARY_URL, data)
    //       PDFs.push(response.data.url.replace(/^http:\/\//i, 'https://'))
    //     }
    //     console.log(PDFs)
    //     return PDFs
    //   }

    const handlePDFupload = async () => {
        let PDFs = []
        for (let i = 0; i < video.PDFfile.length; i++) {
          const data = new FormData()
          data.append('file', video.PDFfile[i])
          data.append('upload_preset', 'vikings')
          data.append('cloud_name', 'dev-empty')
          try {
            let response = await axios.post(process.env.CLOUDINARY_URL, data)
            PDFs.push(response.data.url.replace(/^http:\/\//i, 'https://'))
          } catch (error) {
            console.log(error.response)
            throw new Error(error.response.data.error.message)
          }
        }
        console.log("PDF uploading file",PDFs)
        return PDFs
      }
      

    const handleChange = e => {
        // console.log(d.value)
        const { name, value, files } = e.target
        if(name === 'video_url'){
            const videoSize = files[0]?.size / 1024 / 1024
            if(videoSize > 20){
                // toast.error('The video size greater than 20 MB. Make sure less than 20 MB.', { 
                //     appearance: 'error'
                // })
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'The video size greater than 20 MB. Make sure less than 20 MB.',
                  })
                e.target.value = null
                return
            }
            setVideo(prevState => ({ ...prevState, video_url: files[0]}))
        }else if (name === 'PDFfile'){
            let isValid = true
            for (let i = 0; i < files.length; i++) {
              const PDFfile = files[i]?.size / 1024 / 1024
              if (PDFfile > 10) {
                isValid = false
                // toast.error('One or more PDFs are greater than 2 MB. Make sure all PDFs are less than 2 MB.', {
                //   appearance: 'error'
                // })
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'One or more PDFs are greater than 10 MB. Make sure all PDFs are less than 10 MB.',
                  })
                break
              }
            }
          console.log(files)
            if (isValid) {
              setVideo(prevState => ({ ...prevState, PDFfile: files}))
            } else {
              e.target.value = null
              return
            }
          } else {
            setVideo(prevState => ({ ...prevState, [name]: value }))
        }
        // console.log(video);
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
          let videoUrl = ''
          let PDFfile = []
          if (video.video_url) {
            videoUrl = (await handleVideoUpload()).replace(/^http:\/\//i, 'https://')
            setVideoCount(1)
          }
          if(video.PDFfile){
            PDFfile = await handlePDFupload()
          }
      
          const url = `${baseUrl}/api/v1/courses/course/video-upload`
          const { order, name, description, courseId, chapter, chapterName } = video
          const payload = {
            order,
            name,
            description,
            courseId,
            videoUrl,
            PDFfile,
            chapter,
            chapterName,
            SMlength:PDFfile.length + videoCount
          }
      
          const response = await axios.post(url, payload, {
            headers: { Authorization: token }
          })
      
          console.log(response.data)
      
          setLoading(false)
        //   toast.success(response.data)
            Swal.fire(
                `${response.data}`,
                'success'
              )
          setVideo(INIT_VIDEO)
        } catch (err) {
            // toast.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err}`,
              })
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <React.Fragment>
            <PageBanner 
                pageTitle="Upload Study Material" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Upload Study Material" 
            /> 
 
            <div className="ptb-100">
                <div className="container">
                    {courses.length == 0 && (
                        <Alert color="danger" className="text-center">
                            You have to create course first here <Link href="/teacher/course/create"><a>Create Course</a></Link>
                        </Alert>
                    )}

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
                                <form onSubmit={handleSubmit}>
                                    {loading && (
                                        <h3 className="loading-spinner">
                                            <div className="d-table">
                                                <div className="d-table-cell"> 
                                                    <Spinner color="danger" /> Video uploading...
                                                </div>
                                            </div>
                                        </h3>
                                    )}

                                    <div className="form-group">
                                        <label>Select Course</label>
                                        <select onChange={handleChange} name="courseId" className="form-control">
                                            <option>Select Course</option>
                                            {courses.map(course => (
                                                <option value={course.id} key={course.id}>
                                                    {course.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Chapter</label>
                                        <input 
                                            type="number" 
                                            placeholder="Chapter" 
                                            className="form-control" 
                                            name="chapter"
                                            value={video.chapter}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Chapter Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="chapter name" 
                                            className="form-control" 
                                            name="chapterName"
                                            value={video.chapterName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>order</label>
                                        <input 
                                            type="number" 
                                            placeholder="Order Number" 
                                            className="form-control" 
                                            name="order"
                                            value={video.order}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter course title" 
                                            className="form-control" 
                                            name="name"
                                            value={video.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Description</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter course title" 
                                            className="form-control" 
                                            name="description"
                                            value={video.description}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Video</label>

                                        <br />

                                        <input 
                                            type="file" 
                                            name="video_url" 
                                            accept="video/*"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>PDF, PPT</label>

                                        <br />

                                        <input 
                                            type="file" 
                                            name="PDFfile" 
                                            multiple accept="pdf/*"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <br />

                                    <button 
                                        className="default-btn" 
                                        disabled={disabled || loading}
                                    >
                                        <i className='flaticon-right-chevron'></i>
                                        Upload
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Toaster
                position="bottom-right"
                reverseOrder={false}
            /> */}
        </React.Fragment>
    )
}

UploadCourseVideo.getInitialProps = async ctx => {
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

export default UploadCourseVideo
