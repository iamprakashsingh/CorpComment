//useMemo basically helps in performance optimization. 
//It is a hook that will only recompute the memoized value when one of the dependencies has changed. 
//This optimization helps to avoid expensive calculations on every render.

import { useEffect,  useState } from "react";
import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import { TFeedBackItem } from "./lib/type";

export default function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedBackItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<TFeedBackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddToList = (text: string) => {
    const companyName = text.split(" ").find((word) => word.includes("#"))!.substring(1);
    const newItem: TFeedBackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };
    setFeedbackItems([...feedbackItems, newItem]);
    setFilteredItems([...feedbackItems, newItem]); // update filtered items as well

    fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
  };

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks");
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
        setFilteredItems(data.feedbacks); // initialize filtered items
      } catch {
        setErrorMsg("An error occurred while fetching feedbacks");
      }
      setIsLoading(false);
    };

    handleFetch();
  }, []);

  const handleHashTag = ( feedbackItems.map((item) => item.company));
  // A Set is a built-in JavaScript object that only stores unique values.
// By passing handleHashTag (an array) into Set, JavaScript removes any duplicate values from the array, resulting in a Set with only unique elements.
// [...new Set(handleHashTag)]:

// The ... (spread operator) is used to expand the Set back into an array.
// Wrapping it in square brackets ([...]) converts the Set back into an array format.

  const unique = [...new Set(handleHashTag)];

  const handleOnClickHashtag = ( 
    (tag: string) => {
      if (tag) {
        const filtered = feedbackItems.filter((item) => item.company === tag);
        setFilteredItems(filtered);
      } else {
        setFilteredItems(feedbackItems); // reset to all items if no tag is specified
      }
    }
  
  );

  return (
    <div className="app">
      <Footer />
      <Container
        handleAddToList={handleAddToList}
        feedbackItems={filteredItems}
        isLoading={isLoading}
        errorMsg={errorMsg}
      />
      <HashtagList unique={unique} handleOnClickHashtag={handleOnClickHashtag} />
    </div>
  );
}


