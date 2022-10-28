import React, {useEffect, useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import {offsetDateTimeToDateTime} from "./util/Util";
import QueryNavLink from "./util/QueryNavLink";
import IsActive from "./IsActive";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const LessonGridView = ({rootPath}) => {

    const axiosPrivate = useAxiosPrivate();

    const [errMsg, setErrMsg] = useState(null);
    const [change, setChange] = useState(false)
    const [pageOfLessonDto, setPageOfLessonDto] = useState({})

    useEffect(() => {
        axiosPrivate.get(`${rootPath}/api/v1/lesson`)
            .then(response => {
                console.log(response)
                setPageOfLessonDto(response.data)
            })
            .then(error => {
                console.log(error)
                setErrMsg(error)
            })
    }, [change])

    const handleActivateClick = (event, lessonId) => {
        event.preventDefault()
        axiosPrivate.post(`/api/v1/lesson/${lessonId}/activate`)
            .then(response => {
                console.log(response)
                setChange(prev => !prev)
            })
            .catch(error => {
                console.log(error)
                setErrMsg(error)
            })
    }

    return (
        <div>
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
                        <th className={'width-25'}>description</th>
                    </tr>
                </thead>
                <tbody>
                {
                    pageOfLessonDto.content ?
                        pageOfLessonDto.content.map(lesson => {
                            return (
                                <tr key={lesson.id}>
                                    <td>
                                        <QueryNavLink
                                            style={({ isActive }) => {
                                                return {
                                                    display: "block",
                                                    margin: "1rem 0",
                                                    color: isActive ? "red" : "",
                                                };
                                            }}
                                            to={`/lesson/${lesson.id}`}
                                        >
                                            {lesson.id}
                                        </QueryNavLink>
                                    </td>
                                    <td>{offsetDateTimeToDateTime(lesson.createdAt)}</td>
                                    <td>{offsetDateTimeToDateTime(lesson.updatedAt)}</td>
                                    <td>{offsetDateTimeToDateTime(lesson.startAt)}</td>
                                    <td>{lesson.status}</td>
                                    <td>
                                        <IsActive isActive={lesson.active}/>
                                    </td>
                                    <td>
                                        <Link to={`/plan/${lesson.parentPlanId}`}>{lesson.parentPlanId}</Link>
                                    </td>
                                    <td>{lesson.description}</td>
                                    <td>
                                        {
                                            !lesson.active ?
                                                <button type='button' onClick={(event) => handleActivateClick(event, lesson.id)}>Activate</button> :
                                                null
                                        }
                                    </td>
                                </tr>
                            )
                        }) :
                        null
                }
                </tbody>
            </table>
            {errMsg ? <ErrorMessage msg={errMsg}/> : null}
            <Outlet/>
        </div>
    )
}

export default LessonGridView;