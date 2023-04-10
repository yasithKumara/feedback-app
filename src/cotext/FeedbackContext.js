import { createContext, useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid'

export const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])

    useEffect(()=>{ 
        fetchFeedback()
    },[])

    const fetchFeedback = async () =>{
        const response = await fetch("/feedback?_sort=id&_order=desc")
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }

    const deleteFeedback = async (id) =>{
        if(window.confirm('Are you sure you want to delete?'))
        {
            const response = await fetch(`/feedback/${id}`, {method:'DELETE'})
            setFeedback(feedback.filter(feedback => feedback.id !== id))
        }
        }
         

    const addFeedback = async (newFeedback) =>{
        const response = await fetch('/feedback',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newFeedback)
        })

        const data = await response.json()

        setFeedback([data, ...feedback])
    }

    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit:false
    })

    const editFeedback = (item) =>{
        setFeedbackEdit({
            item: item,
            edit: true
        })
    }

    const updateFeedback = async (id, updItem) =>{
        const response = await fetch(`/feedback/${id}`,
        {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(updItem)
        
        })
        const data = await response.json()

        setFeedback(feedback.map((item)=> item.id === id ? {...item, ...data
        } : item ))
    }

    return <FeedbackContext.Provider value={{
        isLoading,
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
        }}>
        {children}
    </FeedbackContext.Provider>    
}

export default FeedbackContext 