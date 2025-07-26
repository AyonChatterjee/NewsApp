import { useState, useEffect } from "react"
import Navbar from "./Components/Navbar"
import Newsboard from "./Components/Newsboard"
import useTheme from "./useTheme";
import "./App.css" ;

const App = () => {

  const [theme , toggleTheme] = useTheme() ;
  const [category , setCategory] = useState("general") ;

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`app-container`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} setCategory={setCategory}/>
      <Newsboard theme={theme} category={category}/>
    </div>
  ) ;
}

export default App ;
