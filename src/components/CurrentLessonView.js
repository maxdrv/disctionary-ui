import React, {useEffect, useState} from 'react';
import {currentLesson} from "./repository/LessonService";
import CurrentLessonContextView from "./CurrentLessonContextView";

const CurrentLessonView = (props) => {

    const [errMsg, setErrMsg] = useState(null);
    const [change, setChange] = useState(false)
    const [currentLessonResponse, setCurrentLessonResponse] = useState ({})

    useEffect(() => {
        currentLesson()
            .then(response => {
                console.log(response)
                setCurrentLessonResponse(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrMsg(error)
            })
    }, [change])

    return (
        <div>
            {
                currentLessonResponse.hasLesson ?
                    <CurrentLessonContextView context={currentLessonResponse.context}/>:
                    <div>current lesson not found</div>
            }
        </div>
    )
}

export default CurrentLessonView;