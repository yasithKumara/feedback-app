import React, { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect';
import FeedbackContext from '../cotext/FeedbackContext';

function FeedbackForm() {

    const [text, setText] = useState('');
    const [rating, setRating] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('hello');

    const {addFeedback, feedbackEdit, updateFeedback}= useContext(FeedbackContext)

    useEffect(()=>{
        console.log('hello')
        if(feedbackEdit.edit===true){
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    },[feedbackEdit])

    const handleTextChange = (e) =>{

        if(e.target.value === ''){
            setBtnDisabled(true)
            setMessage(null)
        }else if(e.target.value.trim().length <=10 ){
            setMessage('Text should be atleast 10 characters')
            setBtnDisabled(true)
        }else{
            setMessage(null)
            setBtnDisabled(false)
        }

        setText(e.target.value)
    }

    const handlesubmit = (e) => {
        e.preventDefault()


        if(text.trim().length > 10){
            const newFeedback = {
                text,
                rating
            }

            if(feedbackEdit.edit ===true){
                updateFeedback(feedbackEdit.item.id, newFeedback)
            }else{
                addFeedback(newFeedback);
            }

            
            setText('')
        }
        
    }
    
    return <Card>
        <form onSubmit={handlesubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input onChange={handleTextChange} type="text" placeholder='Write a review' value={text}/>
                <Button type="submit" isDisabled={btnDisabled}>Send</Button>
            </div>
            {message && <div className="message">{message}</div> }  
        </form>
    </Card>
  
}

export default FeedbackForm