import { useEffect, useState, useRef, useCallback } from "react";
import NewsItem from "./Newsitem";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const Newsboard = ({ category, searchTerm }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  const lastNewsElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchNews = async () => {
    try {
      setLoading(true);
      NProgress.start();

      let url = "";

      if (searchTerm.trim() === "") {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=10&apiKey=${import.meta.env.VITE_API_KEY}`;
      } else {
        url = `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=publishedAt&page=${page}&pageSize=10&language=en&apiKey=${import.meta.env.VITE_API_KEY}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
      } else {
        setHasMore(false);
      }

      setLoading(false);
      NProgress.done();
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setHasMore(false);
      setLoading(false);
      NProgress.done();
    }
  };

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [category, searchTerm]);

  useEffect(() => {
    fetchNews();
  }, [page, category, searchTerm]);

  return (
    <div>
      <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
      {articles.map((news, index) => {
        if (articles.length === index + 1) {
          return (
            <div ref={lastNewsElementRef} key={index}>
              <NewsItem
                title={news.title}
                description={news.description}
                src={news.urlToImage}
                url={news.url}
              />
            </div>
          );
        } else {
          return (
            <NewsItem
              key={index}
              title={news.title}
              description={news.description}
              src={news.urlToImage}
              url={news.url}
            />
          );
        }
      })}
      {loading && <p className="text-center my-3">Loading more news...</p>}
    </div>
  );
};

export default Newsboard;
