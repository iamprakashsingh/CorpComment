import { useEffect, useState } from "react";
import FeedBackList from "./FeedBackList";
import Header from "./Header";
import { TFeedBackItem } from "./lib/type";

export default function Container() {

  const [feedbackItems, setFeedbackItems] = useState<TFeedBackItem[]>([]);

  const handleAddToList = (text:string)=>{
    const companyName = text
        .split(" ")
        .find((word)=> word.includes("#"))!
        .substring(1);

    const newItem : TFeedBackItem= {
      id : new Date().getTime(),
      text : text,
      upvoteCount : 0,
      daysAgo : 0,
      company : companyName,
      badgeLetter : companyName.substring(0,1).toUpperCase(),
    };
    setFeedbackItems([...feedbackItems,newItem]);

    fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",{
      method:'post',
      headers :{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newItem)
    })
  }
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  

  useEffect(() => {
    
    const handleFetch = async ()=>{
      
            try{
              
              const response = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks")
              if(!response.ok){
                throw new Error();
              }
              const data = await response.json()
              setFeedbackItems(data.feedbacks)
              
            }catch{
              setErrorMsg("An error occurred while fetching feedbacks")
            }
            setIsLoading(false)
    }
    
    handleFetch();
    
  },[])
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList}/>
      <FeedBackList feedbackItems={feedbackItems}  isLoading={isLoading} errorMsg={errorMsg} />
    </main>
  )
}
