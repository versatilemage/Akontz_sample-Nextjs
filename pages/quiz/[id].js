import React, {useState, useEffect} from 'react';
import { parseCookies } from 'nookies'
import PageBanner from '@/components/Common/PageBanner';
import CountdownTimer from '@/components/Common/countdownTimer';
import StudentLeftDashboard from '@/components/_App/studentLeftDashboard';
import baseUrl from '@/utils/baseUrl';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux'
import AfterQuiz from '@/components/Common/afterQuiz';

const TakeQuizzes = ({quizzes}) => {
    console.log(quizzes)
    const userData = useSelector((state) => state.userData)
    const [selectedQuiz, setSelectedQuiz] = useState({});

    useEffect(() => {
        setSelectedQuiz(quizzes)
    }, [quizzes])

    const [pagination, setPaginaton] = useState({
        start: 0,
        end: 1
    });

    const [quizResults, setQuizResults] = useState([])

    const [page, setPage] = useState(1);

    const [completedQuiz, setCompletedQuiz] = useState(false);

    const [score, setScore] = useState(0);

    const [finalAnswers, setFinalAnswers] = useState([]);

    const [buttonText, setButtonText] = useState("Next");

    const [showScreen, setShowScreen] = useState(0)

    const quizLength = selectedQuiz?.quizzes?.length;

    const answerFilter = (e) => {
        if(e === true){
            return e
        }
    }

    function createArray(num) {
        const array = [];
        for (let i = 1; i <= num; i++) {
          array.push(i);
        }
        return array;
    }

    const nextPage = () => {
        setPaginaton({
            start: page,
            end: page+1
        })
        setPage(page + 1)
    }

    const prevPage = () => {
        setPaginaton({
            start: page-2,
            end: page-1
        })
        setPage(page - 1)
    }

    console.log(pagination, page)

    useEffect(() => {
        if(page === quizLength){
            setButtonText("Finish")
        }else {
            setButtonText("Next")
        }
    }, [page])

    const selectPagination = (e) => {
        setPaginaton({
            start: e-1,
            end: e
        })
        setPage(e)
    }

    const timeOver = () => {
        setCompletedQuiz(true)
    }

    const selectAnswer = (questionIndex, selectedAnswer, correctAnswer) => {
        const newAnswers = [...finalAnswers];
        newAnswers[questionIndex] = selectedAnswer;
        setFinalAnswers(newAnswers);
    
        const newResults = [...quizResults];
        const isCorrect = selectedAnswer === correctAnswer;
        newResults[questionIndex] = isCorrect;
        setQuizResults(newResults);
    }

    const finalCorrectAnswers = quizResults.filter(answerFilter).length
    
    console.log(quizResults)

    const resultSubmit = () => {
        console.log(finalAnswers)

        try {
            const url = `${baseUrl}/api/v1/quizResult/addResults`;
            const {courseName, courseId, id} = selectedQuiz;
            const payload = {courseName, courseId, quizId: id, totalMarks: finalCorrectAnswers, userId: userData.userInfo.id}
            const response = axios.post(url, payload);
            console.log(response.data)
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: `You have completed the quiz successfully`,
              })
              setShowScreen(1)
        }catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err}`,
              })
        }
    }

    useEffect(() => {
        if(completedQuiz === true){
            resultSubmit()
        }
    }, [completedQuiz])

    return (
      <>
        <PageBanner 
            pageTitle={selectedQuiz.courseName} 
            homePageUrl="/user/my-profile" 
            homePageText={`${selectedQuiz.courseName} Quiz`}
            activePageText={selectedQuiz.courseName} 
        />  
        {showScreen === 0 ? <>
            {Object.values(selectedQuiz).length > 0 ? <div className="quiz_all-container">
                {/* <StudentLeftDashboard condition={true}/> */}
                <div className="quiz_page-Maincontent">
                        <div className="quiz_top-section">
                            <div>{selectedQuiz.courseName}</div>
                            <CountdownTimer minutes={selectedQuiz?.totalTime} completedIndication={timeOver}/>
                        </div>
                        <div className="quiz_insides">
                            <div className="quiz_page-content_conatainer">
                            {selectedQuiz.quizzes?.slice(pagination?.start, pagination?.end)?.map((i, index) => {
                                return(<div className="quiz-container">
                                    <div className="quiz_question-container">
                                        <p className="quiz_question">{`${page}) ${i.question}`}</p>
                                    </div>
                                    <div className="quiz_answer-container">
                                        {i?.options?.map((j, indices) => {
                                            return (
                                                <div className="quiz_options">
                                                    <input 
                                                        onClick={() =>selectAnswer(page-1, indices+1, i?.quizAnswer)}
                                                        type={"radio"} 
                                                        name={i?.quizAnswer} 
                                                        value={indices+1}>
                                                    </input>

                                                    <label>{j}</label>    
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="quiz_navigation-button_container">
                                            {page >1 ? <button 
                                                className="quiz_navigation-button"
                                                onClick={() =>prevPage(pagination?.end)}>Previous</button>
                                            :
                                            <button className="disabled_previous-button">Previous</button>}
                                            {buttonText === "Next" ? <button 
                                                className="quiz_navigation-button"
                                                onClick={() => nextPage(pagination?.end)}>{buttonText}</button>
                                            :
                                            <button 
                                                className="quiz_navigation-button"
                                                onClick={resultSubmit}>{buttonText}</button>
                                            }
                                    </div>
                                </div>)
                            })}
                            </div>
                            <div className="quiz-pagination_container">
                                {createArray(quizLength).map((i) => {
                                    return <span className="quiz-pagination_buttons" onClick={() => selectPagination(i)}>{i}</span>
                                })}
                            </div>
                        </div>
                </div>
            </div>:null}
        </>
        :
        <AfterQuiz data={selectedQuiz} answers={quizResults}/>}
      </>
    );
}

TakeQuizzes.getInitialProps = async (ctx) => {
    // const id = "8aaee910-6dce-4417-a0a0-c090dc97cf9e";
    const { id } = ctx.query;
    const url = `${baseUrl}/api/v1/quiz/${id}`;
    const response = await axios.get(url)
    return response.data
}


export default TakeQuizzes;
