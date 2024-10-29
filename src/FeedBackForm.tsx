import { useState } from "react"

export default function FeedBackForm({handleAddToList}:{handleAddToList:(text:string)=>void}) {
  const [text,setText] = useState("");
  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
              const newText = e.target.value;
              if(newText.length>150) return;
              setText(newText);
            }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddToList(text);
    setText(""); // Clear text after submitting
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
        <textarea  
            value={text} id="feedback-textarea" placeholder="blabla" spellCheck={false}
            onChange={handleChange}
        />
        <label htmlFor="feedback-textarea">
            Enter your feedback here, remember to #hashtag the company    
        </label>   
        <div>
            <p className="u-italic">{150 - text.length}</p>
            <button><span>Submit</span></button>
        </div>
    </form>
  )
}
