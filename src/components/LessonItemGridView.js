import React, {useEffect, useState} from 'react';
import {offsetDateTimeToDateTime} from "./util/Util";
import ErrorMessage from "./ErrorMessage";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const LessonItemGridView = ({rootPath, lessonId}) => {

    const axiosPrivate = useAxiosPrivate();

    const [errMsg, setErrMsg] = useState(null);
    const [change, setChange] = useState(false)
    const [pageOfLessonItemDto, setPageOfLessonItemDto] = useState({})

    useEffect(() => {
        axiosPrivate.get(`${rootPath}/api/v1/lesson/${lessonId}/item`)
            .then(response => {
                console.log(response)
                setPageOfLessonItemDto(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrMsg(error)
            })
    }, [change])

    return (
        <div>
            <table className={'table-common'}>
                <thead>
                <tr>
                    <th className={'width-10'}>id</th>
                    <th className={'width-15'}>created at</th>
                    <th className={'width-15'}>updated at</th>
                    <th className={'width-10'}>status</th>
                    <th className={'width-10'}>parent phrase id</th>
                    <th className={'width-10'}>order</th>
                    <th className={'width-10'}>question</th>
                    <th className={'width-10'}>correct answer</th>
                    <th className={'width-10'}>user answer</th>
                </tr>
                </thead>
                <tbody>
                {
                    pageOfLessonItemDto.content ?
                        pageOfLessonItemDto.content.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{offsetDateTimeToDateTime(item.createdAt)}</td>
                                    <td>{offsetDateTimeToDateTime(item.updatedAt)}</td>
                                    <td>{item.status}</td>
                                    <td>{item.parentPhraseId}</td>
                                    <td>{item.itemOrder}</td>
                                    <td>{item.question}</td>
                                    <td>{item.answerCorrect}</td>
                                    <td>{item.answerUser}</td>
                                </tr>
                            )
                        }) :
                        null
                }
                </tbody>
            </table>
            {errMsg ? <ErrorMessage/> : null}
        </div>
    )
}

export default LessonItemGridView;