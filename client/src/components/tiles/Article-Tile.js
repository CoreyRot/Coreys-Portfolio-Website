import React, { useEffect, useState } from "react";
import axios from "axios";
import he from "he";
import "../../styles/components/tiles/Article.css";

const WORDPRESS_API_URL =
  "https://public-api.wordpress.com/rest/v1.1/sites/free59822.wordpress.com/posts/";

const Article = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(WORDPRESS_API_URL);
        const posts = data.posts || [];

        const mapped = posts.slice(0, 6).map((post) => ({
          title: he.decode(post.title),
          description:
            he
              .decode(post.excerpt.replace(/<[^>]*>/g, ""))
              .substring(0, 60) + "...",
        }));

        setFeatures(mapped);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="content">
      <div className="article-container">
        <div className="section-header">
          <h2 className="section-title">Articles</h2>
        </div>

        {/* Infinite Marquee Carousel */}
        <div className="marquee">
          <div className="marquee-track">
            {[...features, ...features].map((feature, index) => (
              <div className="marquee-card" key={index}>
                <h4 className="service-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
