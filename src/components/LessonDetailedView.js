import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {offsetDateTimeToDateTime} from "./util/Util";
import ErrorMessage from "./ErrorMessage";
import LessonItemGridView from "./LessonItemGridView";

const LessonDetailedView = ({rootPath}) => {

    const params = useParams()
    const lessonId = params.lessonId

    const [errMsg, setErrMsg] = useState(null);
    const [change, setChange] = useState(false)
    const [lessonDto, setLessonDto] = useState({})

    useEffect(() => {
        axios.get(`${rootPath}/api/v1/lesson/${lessonId}`)
            .then(response => {
                console.log(response)
                setLessonDto(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrMsg(error)
            })
    }, [change])

    return (
        <div>
            <h1>Lesson {lessonId} showed</h1>
            <table className={'table-common'}>
                <thead>
                    <tr>
                        <th className={'width-10'}>id</th>
                        <th className={'width-15'}>created at</th>
                        <th className={'width-15'}>updated at</th>
                        <th className={'width-15'}>start at</th>
                        <th className={'width-10'}>status</th>
                        <th className={'width-10'}>parent plan id</th>
                        <th className={'width-25'}>description</th>
                    </tr>
                </thead>
                <tbody>
                {
                    lessonDto.id ?
                        <tr>
                            <td>{lessonDto.id}</td>
                            <td>{offsetDateTimeToDateTime(lessonDto.createdAt)}</td>
                            <td>{offsetDateTimeToDateTime(lessonDto.updatedAt)}</td>
                            <td>{offsetDateTimeToDateTime(lessonDto.startAt)}</td>
                            <td>{lessonDto.status}</td>
                            <td>{lessonDto.parentPlanId}</td>
                            <td>{lessonDto.description}</td>
                        </tr> :
                        null
                }
                </tbody>
            </table>
            <LessonItemGridView rootPath={rootPath} lessonId={lessonId}/>
            {errMsg ? <ErrorMessage msg={errMsg}/> : null}
        </div>
    )
}

export default LessonDetailedView;