import { useEffect, useState } from "react"
import NewsItem from "./Newsitem";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// ❗ Configure once to remove spinner
NProgress.configure({ showSpinner: false });


const Newsboard = ({ category, searchTerm }) => {
    // Fetching news articles based on category and search term

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {

                setLoading(true);
                NProgress.start(); // start loading bar

                let url = "";

                if (searchTerm.trim() === "") {
                    url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=10&apiKey=${import.meta.env.VITE_API_KEY}`;
                } else {
                    url = `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=publishedAt&page=${page}&pageSize=10&language=en&apiKey=${import.meta.env.VITE_API_KEY}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                if (data.articles) {
                    setArticles(data.articles);
                } else {
                    setArticles([]);
                }

                NProgress.done(); // End loading bar
            } catch (error) {
                console.error("Failed to fetch news:", error);
                setArticles([]);

                NProgress.done(); // Even an error 
            }
        };

        fetchNews();
    }, [page, category, searchTerm]);


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