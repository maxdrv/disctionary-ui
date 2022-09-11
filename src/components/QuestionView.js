import React, {useState} from 'react';

const QuestionView = ({nextQuestion}) => {

    const lessonId = nextQuestion.lessonId
    const lessonItemId = nextQuestion.question.lessonItemId
    const question = nextQuestion.question.question
    const [answer, setAnswer] = useState("")

    const handleAnswerChanged = (event) => {
        event.preventDefault()
        setAnswer(event.value)
    }

    return (
        <div>
            {
                question ?
                    <div>
                        {question} {" "}
                        <input
                            type='text'
                            required='required'
                            name='answer'
                            value={answer}
                            onChange={handleAnswerChanged}
                            placeholder='enter your answer'
                        />
                    </div>:
                    <div>no more questions</div>
            }
        </div>
    )
}

export default QuestionView;