import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {offsetDateTimeToDateTime} from "./util/Util";
import ErrorMessage from "./ErrorMessage";
import LessonItemGridView from "./LessonItemGridView";
import IsActive from "./IsActive";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const LessonDetailedView = () => {

    const params = useParams()
    const lessonId = params.lessonId

    const [errMsg, setErrMsg] = useState(null);
    const [change, setChange] = useState(false)
    const [lessonDto, setLessonDto] = useState({})

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        axiosPrivate.get(`/api/v1/lesson/${lessonId}`)
            .then(response => {
                console.log(response)
                setLessonDto(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrMsg(error)
            })
    }, [change])

    const handleActivateClick = (event) => {
        event.preventDefault()
        axiosPrivate.post(`/api/v1/lesson/${lessonId}/activate`)
            .then(response => {
                console.log(response)
                setLessonDto(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrMsg(error)
            })
    }

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
                        <th className={'width-5'}>status</th>
                        <th className={'width-5'}>active</th>
                        <th className={'width-10'}>parent plan id</th>
                        <th className={'width-15'}>description</th>
                        <th className={'width-10'}>actions</th>
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
                            <td><IsActive isActive={lessonDto.active}/></td>
                            <td>
                                <Link to={`/plan/${lessonDto.parentPlanId}`}>{lessonDto.parentPlanId}</Link>
                            </td>
                            <td>{lessonDto.description}</td>
                            <td>
                                {
                                    !lessonDto.active ?
                                        <button type='button' onClick={handleActivateClick}>Activate</button> :
                                        null
                                }
                            </td>
                        </tr> :
                        null
                }
                </tbody>
            </table>
            <LessonItemGridView lessonId={lessonId}/>
            {errMsg ? <ErrorMessage msg={errMsg}/> : null}
        </div>
    )
}

export default LessonDetailedView;