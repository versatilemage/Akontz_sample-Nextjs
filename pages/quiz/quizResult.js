import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import PageBanner from '@/components/Common/PageBanner';
import StudentLeftDashboard from '@/components/_App/studentLeftDashboard';
import baseUrl from '@/utils/baseUrl';
import axios from 'axios';

const Quizresult = ({getResults}) => {
    const userData = useSelector((state) => state.userData);
    const userId = userData?.userInfo?.id
    const [results, setResults] = useState([])

    console.log(userId)

    useEffect(() => {
        setResults(getResults)
    }, [getResults])

    console.log(results?.getResults)

    const gettingResult = async() => {
        const id = userId
        const url = `${baseUrl}/api/v1/quizResult/${id}`;
        const response = await axios.get(url);
        return setResults(response.data)
    }

    useEffect(() => {
        if(userId !== undefined){
            gettingResult()
        }
    }, [userId])

    const filterCourse = (e) => {
        if(e?.courseId){
            return e
        }
    }

    function calculatePercentage(num, total) {
        return (num/total) * 100;
    }

    return (
        <>
            <PageBanner 
                pageTitle={`Quiz Results`} 
                homePageUrl="/" 
                homePageText={`Home`}
                activePageText={`Quiz Results`} 
            /> 
            <div className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-lg-4">
                            <StudentLeftDashboard/>
                        </div>

                        <div className="col-md-8 col-lg-8">
                            <div className="border-box">
                                {results?.getResults?.length > 0 ? 
                                <div className="resultsBox-wrapper">
                                    {results?.getResults?.map((i) => {
                                        return (
                                        <div className="quiz_results-box">
                                            <div className="quizResults_contents-container">
                                                <p>Name</p>
                                                <p>{i.courseName}</p>
                                            </div>
                                            <div className="quizResults_contents-container">
                                                <p>Total Marks</p>
                                                <p>{calculatePercentage(i.totalMarks, 10)} %</p>
                                            </div>  
                                            <div className="quizResults_contents-container">
                                                <p>No. Of Attempst</p>
                                                <p>{results?.getResults?.length}</p>
                                            </div>                  
                                        </div>
                                        )
                                    })}
                                </div> 
                                :
                                <div>No Quizzes taken</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Quizresult.getInitialProps = async (ctx) => {
//     const id = userId;
//     const url = `${baseUrl}/api/v1/quizResult/${id}`;
//     const response = await axios.get(url);
//     return response.data
// }

export default Quizresult;
