// Type Usage in React
// In React, components often receive props as a single parameter. Here, FeedBackItem is a component that’s receiving the data about a feedback item wrapped in a feedbackItem property, like so:

import { TFeedBackItem } from "./lib/type"

// javascript
// Copy code
// <FeedBackItem feedbackItem={feedbackItem} />
// So we create FeedbackItemProps to describe the structure of the props, making it clear that the props contain a feedbackItem of type FeedBackItem.



type FeedbackItemProps  = {
    feedbackItem: TFeedBackItem
}

export default function FeedBackItem({feedbackItem}: FeedbackItemProps
  ) {
  return (
    <li className="feedback">
            <button>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" 
                xmlns="http://www.w3.org/2000/svg"><path 
                d="M4 9H11L7.5 4.5L4 9Z" 
                fill="currentColor">
            </path></svg>
              {feedbackItem.upvoteCount}
            </button>

            <div>
              <p>{feedbackItem.badgeLetter}</p>
            </div>

            <div>
              <p>{feedbackItem.company}</p>
              <p>
                {feedbackItem.text}
              </p>
            </div>
            <p>{feedbackItem.daysAgo===0 ? 'NEW':`${feedbackItem.daysAgo}d`}</p>
    </li>
  )
}
