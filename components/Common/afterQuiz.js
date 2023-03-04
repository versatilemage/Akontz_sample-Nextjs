import React, {useState, useEffect} from 'react';

const AfterQuiz = ({data, answers}) => {
    console.log(data, answers)
    const sample = [true, false]
    return (
        <>
            {Object.values(data).length > 0 ? 
            <div className="afterQUiz-results-Viewer_container">
                <h3 className="answerKey-heading">Answer Key for {data?.courseName}</h3>
                {data?.quizzes?.map((i, index) => {
                    return (
                    <div key={index} className={answers[index] === true ? "the_answeis-correct" : "the_answeris-wrong"}>
                        <div className="answered_question-container">
                            <p>{`${index + 1} )${i?.question}`}</p>
                        </div>
                        <div className="answer_options-container">
                            {i?.options?.map((j, indices) => {
                            return (
                            <ul className="AnswerList_key">
                                <li className={i?.quizAnswer === indices+1 ? "quizzes_correctAnswer" : "quizzes_options-li"}>{j}</li>
                            </ul>
                            )})}
                        </div>
                    </div>
                    )
                })}
            </div>
            :
            <div>
                ...wait a moment
            </div>
            }
        </>
    )
}

export default AfterQuiz;
