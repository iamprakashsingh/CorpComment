
import FeedBackItem from "./FeedBackItem";
import Spinner from "./Spinner";
import Error from "./Error";
import { TFeedBackItem } from "./lib/type";



export default function FeedBackList({feedbackItems, isLoading, errorMsg}: {feedbackItems: TFeedBackItem[], isLoading: boolean, errorMsg: string}) {
  
  
  return (
    <ol className="feedback-list">
        
        {
          errorMsg && <Error errorMsg={errorMsg}/>
        }
        {
          isLoading && <Spinner/>
        }
        {
          feedbackItems.map((feedbackItem)=>{
            return <FeedBackItem  feedbackItem = {feedbackItem} key={feedbackItem.id}/>
          })
        }

    </ol>
  )
}
