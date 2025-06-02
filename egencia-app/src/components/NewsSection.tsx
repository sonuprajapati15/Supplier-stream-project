import React, { useEffect, useState } from "react";
import "../css/news-listing.css"

const NewsSection: React.FC<{ place: string }> = ({ place }) => {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!place) return;
        setLoading(true);
        fetch(`http://localhost:9000/supplier/v1/news?place=${place}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === "ok") {
                    setNews(data.articles.slice(0, 50)); // Limit to top 50 articles
                }
            })
            .finally(() => setLoading(false));
    }, [place]);

    if (loading) return <div>Loading news...</div>;
    if (!news.length) return <div>No news articles found for {place}.</div>;

    return (
        <div className="news-section">
            <h3> News Articles for {place}</h3>
            <div className="news-list">
                {news.map((article, index) => (
                    <div key={index} className="news-item">
                        <img src={article.urlToImage} alt={article.title} className="news-image" />
                        <div className="news-content">
                            <div className="news-meta">
                                <span className="news-time">{new Date(article.publishedAt).toLocaleString()}</span>
                                <span className="news-author">{article.author || "Unknown Author"}</span>
                            </div>
                            <h4 className="news-title">{article.title}</h4>
                            <p className="news-description">{article.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsSection;