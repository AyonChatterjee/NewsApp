import { useState, useEffect } from "react"
import Navbar from "./Components/Navbar";
import Newsboard from "./Components/Newsboard";
import useTheme from "./useTheme";
import "./App.css" ;

const App = () => {

  const [theme , toggleTheme] = useTheme() ;
  const [category , setCategory] = useState("general") ;
  const [searchTerm , setSearchTerm] = useState("");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);


  const handleCategoryChange = (newCategory) => {
     setCategory(newCategory);
     setSearchTerm(""); // Reset search term when category changes
  }


  const handleSearch = (term) => {
    setSearchTerm(term);
  }


  return (
    <div className={`app-container`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} setCategory={setCategory} onCategoryChange={handleCategoryChange}  onSearch={handleSearch} />
      <Newsboard theme={theme} category={category} searchTerm={searchTerm} />
    </div>
  ) ;
}

export default App ;
