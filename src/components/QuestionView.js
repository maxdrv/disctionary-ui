import React, {useState} from 'react';

const QuestionView = ({nextQuestion}) => {

    const currentLessonItemId = nextQuestion.lessonItemId
    const currentQuestion = nextQuestion.question
    const [answer, setAnswer] = useState("")

    const handleAnswerChanged = (event) => {
        event.preventDefault()
        setAnswer(event.value)
    }

    return (
        <div>
            {
                nextQuestion.question ?
                    <div>
                        {currentQuestion}
                        <input
                            type='text'
                            required='required'
                            name='answer'
                            value={answer}
                            onChange={handleAnswerChanged}
                            placeholder='enter your answer'
                        />
                    </div> :
                    <div>no more questions</div>
            }
        </div>
    )
}

export default QuestionView;