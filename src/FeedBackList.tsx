import { useEffect, useState } from "react";
import FeedBackItem from "./FeedBackItem";
import Spinner from "./Spinner";
import Error from "./Error";



export default function FeedBackList() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    
    fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks")
      .then((response)=>{
        if(!response.ok){
          throw new Error();
        }
        return response.json()
      })
      .then((data)=> { 
        setFeedbackItems(data.feedbacks)
        setIsLoading(false)
      })
      .catch(()=>{
        //error can occur due to multiple reasons.the top 3 reasons are:
        //network error,not 2xx response,json parsing error
        setErrorMsg("An error occurred while fetching feedbacks")
        setIsLoading(false)
      })
  })
  return (
    <ol className="feedback-list">
        

        

        {
          errorMsg ? <Error errorMsg={errorMsg}/> : null
        }
        {
          isLoading ? <Spinner/> : null
        }
        {
          feedbackItems.map((feedbackItem)=>{
            return <FeedBackItem  feedbackItem = {feedbackItem} key={feedbackItem.id}/>
          })
        }
    </ol>
  )
}
