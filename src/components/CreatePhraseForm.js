import React, {useState} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CreatePhraseForm = ({setChange, planId}) => {

    const axiosPrivate = useAxiosPrivate();

    const [createPhraseFormData, setCreatePhraseFormData] = useState({
        source: '',
        sourceLang: 'FR',
        transcription: '',
        target: '',
        targetLang: 'RU',
        planId: planId
    })

    const handleCreatePhraseFormChanged = (event) => {
        event.preventDefault()

        const fieldName = event.target.name
        const fieldValue = event.target.value

        setCreatePhraseFormData({...createPhraseFormData, [fieldName]: fieldValue})
    }

    const handleSubmitCreatePhraseForm = (event) => {
        event.preventDefault()
        const createPhraseRequest = {...createPhraseFormData}
        axiosPrivate.post(`/api/v1/phrase`, createPhraseRequest)
            .then(response => {
                console.log(response.data)
                setChange(prev => !prev)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className={'form-add-common'}>
            <form onSubmit={handleSubmitCreatePhraseForm}>
                <span className={'width-10'}>

                </span>
                <span className={'width-20'}>
                    <input
                        type='text'
                        required='required'
                        name='source'
                        value={createPhraseFormData.source}
                        onChange={handleCreatePhraseFormChanged}
                        placeholder='text in source language'
                    />
                </span>
                <span className={'width-10'}>
                    <input
                        type='text'
                        required='required'
                        name='sourceLang'
                        value={createPhraseFormData.sourceLang}
                        onChange={handleCreatePhraseFormChanged}
                        placeholder='source language'
                    />
                </span>
                <span className={'width-20'}>
                    <input
                        type='text'
                        required='required'
                        name='transcription'
                        value={createPhraseFormData.transcription}
                        onChange={handleCreatePhraseFormChanged}
                        placeholder='transcription'
                    />
                </span>
                <span className={'width-20'}>
                    <input
                        type='text'
                        required='required'
                        name='target'
                        value={createPhraseFormData.target}
                        onChange={handleCreatePhraseFormChanged}
                        placeholder='text in target language'
                    />
                </span>
                <span className={'width-10'}>
                    <input
                        type='text'
                        required='required'
                        name='targetLang'
                        value={createPhraseFormData.targetLang}
                        onChange={handleCreatePhraseFormChanged}
                        placeholder='target language'
                    />
                </span>
                <span className={'width-10'}>
                    <button type='submit'>Add Phrase</button>
                </span>
            </form>
        </div>
    )
}

export default CreatePhraseForm;