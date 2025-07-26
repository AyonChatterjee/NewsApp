import { useState, useEffect } from "react";

function useTheme() {
    const [theme , setTheme] = useState("light");


    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light")) ;
    } ;


    useEffect(() => {

        // Clean previous class
        document.body.classList.remove = ("light" , "dark");

        // Add new theme class to body
        document.body.classList.add(theme) ;
        
    } , [theme]);

    return [theme , toggleTheme] ;
}

export default useTheme;