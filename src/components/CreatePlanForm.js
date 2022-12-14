import React, {useState} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CreatePlanForm = ({setChange}) => {

    const axiosPrivate = useAxiosPrivate();

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

        axiosPrivate.post(`/api/v1/plan`, req)
            .then(response => {
                console.log(response)
                setChange(prev => !prev)
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