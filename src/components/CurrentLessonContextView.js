import React from 'react';
import {offsetDateTimeToDateTime} from "./util/Util";
import QuestionView from "./QuestionView";

const CurrentLessonContextView = ({context}) => {

    return (
        <div>
            <h1>Lesson {context.lessonId} in progress</h1>
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
                    context.lessonId ?
                        <tr>
                            <td>{context.lessonId}</td>
                            <td>{offsetDateTimeToDateTime(context.startAt)}</td>
                            <td>{context.status}</td>
                            <td>{context.description}</td>
                        </tr> :
                        null
                }
                </tbody>
            </table>
            <h2>Answer the question</h2>
            <QuestionView nextQuestion={context}/>
            <h2>Done</h2>
        </div>
    )
}

export default CurrentLessonContextView;