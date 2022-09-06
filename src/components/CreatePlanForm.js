import React, {useState} from 'react';
import axios from "axios";

const CreatePlanForm = ({path, setChange, setPlanDetailedId}) => {

    const [createPlanFormData, setCreatePlanFormData] = useState({
        description: ''
    })

    const handleAddPlanFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.name
        const fieldValue = event.target.value

        setCreatePlanFormData({...createPlanFormData, [fieldName]: fieldValue})
    }

    const handleSubmitAddPlanForm = (event) => {
        event.preventDefault();

        const req = {
            description: createPlanFormData.description,
            tags: []
        }

        axios.post(path, req)
            .then(response => {
                console.log(response)
                setChange(prev => !prev)
                const createdPlanId = response.data.id
                setPlanDetailedId(createdPlanId)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className={'form-add-common'}>
            <form onSubmit={handleSubmitAddPlanForm}>
                <span className={'width-10'}></span>
                <span className={'width-15'}></span>
                <span className={'width-15'}></span>
                <span className={'width-30'}>
                     <input
                         type='text'
                         required='required'
                         name='description'
                         value={createPlanFormData.description}
                         onChange={handleAddPlanFormChange}
                         placeholder='describe what this lesson plan about'
                     />
                </span>
                <span className={'width-20'}></span>
                <span className={'width-10'}>
                    <button type='submit'>Add Plan</button>
                </span>
            </form>
        </div>
    )
}

export default CreatePlanForm;