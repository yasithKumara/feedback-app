import React from 'react'
import FeedBackItem from './FeedBackItem'
//import PropTypes from 'prop-types'
import { useContext } from 'react'
import FeedbackContext from '../cotext/FeedbackContext'
import Spinner from './shared/Spinner'

function FeedbackList({handleDelete}) {

  const {feedback, isLoading} = useContext(FeedbackContext)
    
  if(!isLoading && (!feedback || feedback.length === 0)){
    return <p>No feedback yet</p>
  }

  return isLoading ? (
    //console.log('loading')
    <Spinner/>    
    ) : (
  <div className='feedback-list'>
      {
          feedback.map((item)=>
              <FeedBackItem 
              key={item.id} 
              item={item}
              />
          )
      }</div>
  )

}

// FeedbackList.propTypes = {
//   feedback: PropTypes.arrayOf(
//     PropTypes.shape({
//       //id: PropTypes.number.isRequired,
//       rating: PropTypes.number.isRequired,
//       text: PropTypes.string.isRequired
//     })   
//   )
// }

export default FeedbackList