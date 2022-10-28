import React, {useEffect, useState} from 'react';
import {offsetDateTimeToDateTime} from "./util/Util";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CurrentLessonView = (props) => {

    const axiosPrivate = useAxiosPrivate();

    const [errMsg, setErrMsg] = useState(null);
    const [change, setChange] = useState(false)
    const [currentLessonResponse, setCurrentLessonResponse] = useState ({})
    const [answerFormData, setAnswerFormData] = useState({answer: ""})

    useEffect(() => {
        axiosPrivate.get(`/api/v1/currentLesson`)
            .then(response => {
                console.log(response)
                setCurrentLessonResponse(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrMsg(error)
            })
    }, [change])

    const handleAnswerFormChanged = (event) => {
        event.preventDefault()

        const fieldName = event.target.name
        const fieldValue = event.target.value

        setAnswerFormData({...answerFormData, [fieldName]: fieldValue})
    }


    const handleSubmitAnswerClick = (event) => {
        event.preventDefault()

        const lessonId = currentLessonResponse.context.next.lessonId;
        const lessonItemId = currentLessonResponse.context.next.question.lessonItemId;
        axiosPrivate.post(`/api/v1/lesson/${lessonId}/item/${lessonItemId}/answerAndGetContext`, {...answerFormData})
            .then(response => {
                console.log(response)
                setCurrentLessonResponse(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            {
                currentLessonResponse.context ?
                    <div>
                        <h1>Lesson {currentLessonResponse.context.lessonId} in progress</h1>
                        <table className={'table-common'}>
                            <thead>
                            <tr>
                                <th className={'width-10'}>id</th>
                                <th className={'width-15'}>start at</th>
                                <th className={'width-10'}>status</th>
                                <th className={'width-65'}>description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentLessonResponse.context.lessonId ?
                                    <tr>
                                        <td>{currentLessonResponse.context.lessonId}</td>
                                        <td>{offsetDateTimeToDateTime(currentLessonResponse.context.startAt)}</td>
                                        <td>{currentLessonResponse.context.status}</td>
                                        <td>{currentLessonResponse.context.description}</td>
                                    </tr> :
                                    null
                            }
                            </tbody>
                        </table>
                        <h2>Answer the question</h2>
                        <div>
                            {
                                currentLessonResponse?.context?.next?.question?.question ?
                                    <div>
                                        <form onSubmit={handleSubmitAnswerClick}>
                                            <div>{currentLessonResponse.context.next.question.question}</div>
                                            <div>
                                                <input
                                                    type='text'
                                                    required='required'
                                                    name='answer'
                                                    value={answerFormData.answer}
                                                    onChange={handleAnswerFormChanged}
                                                    placeholder='enter your answer'
                                                />
                                            </div>
                                            <div>
                                                <button type='submit'>Answer</button>
                                            </div>
                                        </form>
                                    </div>:
                                    <div>no more questions</div>
                            }
                        </div>
                        <h2>Done</h2>
                        <table className={'table-common'}>
                            <thead>
                                <tr>
                                    <th className={'width-10'}>id</th>
                                    <th className={'width-5'}>order</th>
                                    <th className={'width-25'}>question</th>
                                    <th className={'width-25'}>correct answer</th>
                                    <th className={'width-25'}>your answer</th>
                                    <th className={'width-10'}>status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                currentLessonResponse?.context?.done ?
                                    currentLessonResponse.context.done.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.itemOrder}</td>
                                                <td>{item.question}</td>
                                                <td>{item.answerCorrect}</td>
                                                <td>{item.answerUser}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        )
                                    }) :
                                    null
                            }
                            </tbody>
                        </table>
                    </div> :
                    <div>current lesson not found</div>
            }
        </div>
    )
}

export default CurrentLessonView;