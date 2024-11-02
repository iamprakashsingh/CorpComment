
import FeedBackList from "./FeedBackList";
import Header from "./Header";
import { TFeedBackItem } from "./lib/type";

export default function Container({handleAddToList,feedbackItems,isLoading,errorMsg}:{handleAddToList:(text:string)=>void,feedbackItems:TFeedBackItem[],isLoading:boolean,errorMsg:string}) {

  
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList}/>
      <FeedBackList feedbackItems={feedbackItems}  isLoading={isLoading} errorMsg={errorMsg} />
    </main>
  )
}
