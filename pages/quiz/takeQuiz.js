import React, {useState, useEffect} from 'react';

import PageBanner from '@/components/Common/PageBanner';
import CountdownTimer from '@/components/Common/countdownTimer';
import StudentLeftDashboard from '@/components/_App/studentLeftDashboard';
import baseUrl from '@/utils/baseUrl';
import { useRouter } from "next/router";
import axios from 'axios';

const TakeQuizzz = ({quizzes}) => {

    const [quizData, setQuizData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        setQuizData(quizzes)
    }, [quizzes])

    console.log(quizData)

    const onRedirecting = (e) => {
        router.push(`/quiz/${e}`)
    }

    return (
      <>
        <PageBanner 
            pageTitle={`Unlocked Quizzes`} 
            homePageUrl="/user/my-profile" 
            homePageText={`Home`}
            activePageText={`Unlocked Quizzes`} 
        />  
        <div className="take_quizall-container">
            <StudentLeftDashboard/>
            <div className="takeQuiz_page-Maincontainer">
                {quizData.map((i, index) => {
                    return (
                    <div key={index}>
                        <button className="quiz_redirect-buttons" onClick={() => onRedirecting(i?.courseId)}>{i?.courseName}</button>
                    </div>
                    )
                })}
            </div>
        </div>
      </>
    );
}

TakeQuizzz.getInitialProps = async(ctx) => {
    const url = `${baseUrl}/api/v1/quiz/getQuiz`
    const response = await axios.get(url)
    return response.data
}


export default TakeQuizzz;
