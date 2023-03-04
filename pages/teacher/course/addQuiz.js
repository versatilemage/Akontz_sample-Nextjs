import React, { useState } from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import { Alert } from 'reactstrap'
import baseUrl from '@/utils/baseUrl'
import { Spinner } from 'reactstrap'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2';
import catchErrors from '@/utils/catchErrors'
import PageBanner from '@/components/Common/PageBanner'
import { useSelector } from 'react-redux'
import Link from '@/utils/ActiveLink'
import SuperAdminLeftDashboard from '@/components/_App/SuperAdminLeftDashboard'
import AdminLeftDashboard from '@/components/_App/AdminLeftDashboard'
import TeacherLeftDashboard from '@/components/_App/TeacherleftDashBoard'

const uploadQuiz = ({ courses }) => {
    const { token } = parseCookies()

    const [quizData, setQuizData] = useState({
        totalTime: 0,
        courseId: "",
        courseName: "",
        quizzes: [
            {
                question: "",
                options: ["", "", "", ""],
                quizAnswer: 0,
                Hints: "NA"
            }
        ]
    });

    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(true)
    const userData = useSelector((state) => state.userData)
    const userRole = userData?.userInfo?.role

    const handleChange = (e, questionIndex, optionIndex) => {
        const { name, value } = e.target;
        const updatedQuizData = { ...quizData };

        if (name === "question") {
            updatedQuizData.quizzes[questionIndex].question = value;
        } else if (name === "option") {
            updatedQuizData.quizzes[questionIndex].options[optionIndex] = value;
        } else if (name === "quizAnswer") {
            updatedQuizData.quizzes[questionIndex].quizAnswer = parseInt(value);
        } else if (name === "Hints") {
            updatedQuizData.quizzes[questionIndex].Hints = value;
        } else if (name === "totalTime") {
            updatedQuizData.totalTime = parseInt(value);
        } else if (name === "courseId") {
            const [courseId, courseName] = value.split("|||")
            updatedQuizData.courseId = courseId
            updatedQuizData.courseName = courseName
        }

        setQuizData(updatedQuizData);
    };

    const handleAddQuestion = () => {
        const updatedQuizData = { ...quizData };
        updatedQuizData.quizzes.push({
            question: "",
            options: ["", "", "", ""],
            quizAnswer: 0,
            Hints: ""
        });
        setQuizData(updatedQuizData);
    };

    const handleAddOption = (questionIndex) => {
        const updatedQuizData = { ...quizData };
        updatedQuizData.quizzes[questionIndex].options.push("");
        setQuizData(updatedQuizData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(quizData);
        // submit the form data via API call

        try {
            const url = `${baseUrl}/api/v1/quiz/addQuiz`

            const {totalTime, courseId, quizzes} = quizData
    
            const payload = {totalTime, courseId, quizzes, courseName}
    
            const response = axios.post(url, payload, {
                headers: {Authorization: token}
            });
    
            console.log(response.data)

            Swal.fire({
                icon: 'success',
                title: 'success',
                text: `Quiz has been added successfully`,
              })
        }catch(error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error}`,
              })
        }

    };
    return (
        <>
            <PageBanner 
                pageTitle="Upload Quiz" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Upload Quiz" 
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
                                <SuperAdminLeftDashboard />
                                :
                                (userRole === "admin"
                                    ?
                                    <AdminLeftDashboard />
                                    :
                                    (userRole === "teacher"
                                        ? <TeacherLeftDashboard />
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
                                                    <Spinner color="danger" /> Quiz uploading...
                                                </div>
                                            </div>
                                        </h3>
                                    )}
                                    <div className="form-group">
                                        <label>Select Course</label>
                                        <select onChange={handleChange} name="courseId" className="form-control">
                                            <option>Select Course</option>
                                            {courses.map(course => (
                                                <option value={`${course.id}|||${course.title}`} key={course.id}>
                                                    {course.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Quiz Time</label>
                                        <input
                                            type="number"
                                            placeholder="Quiz Question"
                                            className="form-control"
                                            name="totalTime"
                                            value={quizData.totalTime}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {quizData?.quizzes?.map((question, questionIndex) => (
                                        <div key={questionIndex}>
                                            <div className="form-group">
                                                <label className="quiz_questions-inputs">
                                                    Question {questionIndex + 1}:
                                                    <textarea
                                                        type="text"
                                                        name="question"
                                                        className="form-control"
                                                        value={question.question}
                                                        onChange={(e) => handleChange(e, questionIndex)}
                                                    />
                                                </label>
                                            </div>
                                            <br />
                                            {question?.options?.map((option, optionIndex) => (
                                                <div key={optionIndex} className="form-group">
                                                    <label className="quiz_questions-inputs">
                                                        Option {optionIndex + 1}:
                                                        <input
                                                            type="text"
                                                            name="option"
                                                            className="form-control"
                                                            value={option}
                                                            onChange={(e) => handleChange(e, questionIndex, optionIndex)}
                                                        />
                                                    </label>
                                                    <br />
                                                    {optionIndex === question.options.length - 1 && (
                                                        <button className="default-btn add_options-andQuestions_button" type="button" onClick={() => handleAddOption(questionIndex)}>
                                                            Add another option
                                                        </button>
                                                    )}
                                                    <br />
                                                </div>
                                            ))}

                                            <div className="form-group">
                                                <label className="quiz_questions-inputs">
                                                    Correct answer:
                                                    <input
                                                        type="number"
                                                        name="quizAnswer"
                                                        className="form-control"
                                                        value={question.quizAnswer}
                                                        onChange={(e) => handleChange(e, questionIndex)}
                                                    />
                                                </label>
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label className="quiz_questions-inputs">
                                                    Hint:
                                                    <input
                                                        type="text"
                                                        name="Hints"
                                                        className="form-control"
                                                        value={question.Hints}
                                                        onChange={(e) => handleChange(e, questionIndex)}
                                                    />
                                                </label>
                                            </div>
                                            <br />
                                        </div>
                                    ))}
                                    <br />
                                    <button type="button" onClick={handleAddQuestion} className="default-btn add_options-andQuestions_button">
                                        Add another question
                                    </button>
                                    <br />
                                    <br />
                                    <button
                                        className="default-btn"
                                        // disabled={disabled || loading}
                                        >
                                        <i className='flaticon-right-chevron'></i>
                                        Upload Quiz
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

uploadQuiz.getInitialProps = async ctx => {
    const { token } = parseCookies(ctx)
    if (!token) {
        return { courses: [] }
    }

    const payload = {
        headers: { Authorization: token }
    }

    const url = `${baseUrl}/api/v1/courses/my-courses`
    const response = await axios.get(url, payload)
    // console.log(response.data)
    return response.data
}

export default uploadQuiz;
