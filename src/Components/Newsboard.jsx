import { useEffect, useState } from "react"
import NewsItem from "./Newsitem";

const Newsboard = ({ category, searchTerm }) => {
    // Fetching news articles based on category and search term

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                let url = "";

                if (searchTerm.trim() === "") {
                    url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
                } else {
                    url = `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=publishedAt&language=en&apiKey=${import.meta.env.VITE_API_KEY}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                if (data.articles) {
                    setArticles(data.articles);
                } else {
                    setArticles([]);
                }
            } catch (error) {
                console.error("Failed to fetch news:", error);
                setArticles([]);
            }
        };

        fetchNews();
    }, [category, searchTerm]);


    return (
        <div>
            <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
            {articles.map((news, index) => {
                return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
            })}
        </div>
    )
}

export default Newsboard