import FeedBackForm from "./FeedBackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Pattern from "./Pattern";


export default function Header({handleAddToList}:{handleAddToList:(text:string)=>void}) {
  return (
    <header>
      <Pattern/>
      <Logo/>
      <PageHeading/>
      <FeedBackForm handleAddToList={handleAddToList}/>
    </header>
  )
}
