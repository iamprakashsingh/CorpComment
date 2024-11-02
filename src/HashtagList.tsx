export default function HashtagList({unique,handleOnClickHashtag}: {unique: string[], handleOnClickHashtag: (tag:string)=>void}) {
  return (
    <ul className="hashtags">
      {
        unique.map((tag, index)=> (
          <li key={index}>
            <button onClick={()=>handleOnClickHashtag(tag)}>#{tag}</button>
          </li>
        ))
      }
    </ul>
  )
}
