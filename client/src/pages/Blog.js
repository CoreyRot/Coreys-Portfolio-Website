import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import he from "he";
import "../styles/Blog.css";

const PROXY_URL = "https://api.allorigins.win/raw?url=";
const WORDPRESS_API_URL = "http://coreys-headless-blog.great-site.net/wp-json/wp/v2/posts?_embed&orderby=date&order=asc";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);

  axios.get(`${PROXY_URL}${encodeURIComponent(WORDPRESS_API_URL)}`)
  .then((response) => {
    console.log("API Response:", response.data); // Debugging the response

    const posts = Array.isArray(response.data) ? response.data : response.data.posts || [];
    if (!Array.isArray(posts)) {
      console.error("❌ API response is not an array:", response.data);
      setLoading(false);
      return;
    }

    // Find featured blog
    const featured = posts.find(post => post.tags && Array.isArray(post.tags) && post.tags.includes(2));

    // Filter other blogs
    const nonFeaturedBlogs = posts.filter(post => !(post.tags && Array.isArray(post.tags) && post.tags.includes(2))).slice(0, 4);

    setFeaturedBlog(featured || null);
    setOtherBlogs(nonFeaturedBlogs);
    setLoading(false);
  })
  .catch((error) => {
    console.error("Error fetching blogs:", error);
    setLoading(false);
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="blog-background">
        <h2 className="section-title">Blogs</h2>

        {featuredBlog && (
          <div className="featured-blog">
            <div className="featured-image">
                <img src={featuredBlog._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/600x400"} alt={featuredBlog.title.rendered}/>
                <span className="featured-tag">Featured</span>
            </div>
            <div className="featured-content">
                <p className="blog-date">{new Date(featuredBlog.date).toLocaleDateString()}</p>
                <h3>{he.decode(featuredBlog.title.rendered)}</h3>
                <p dangerouslySetInnerHTML={{ __html: featuredBlog.excerpt.rendered }}></p>
                <Link to={`/blogs/${featuredBlog.id}`} className="read-more">Read More</Link>
            </div>
          </div>
        )}

        <div className="blog-grid">
          {otherBlogs.map((blog) => (
            <div key={blog.id} className="blog-item">
                <img src={blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/400x250"} alt={blog.title.rendered}/>
                <div className="blog-item-content">
                    <h4>{he.decode(blog.title.rendered)}</h4>
                    <p dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }}></p>
                    <Link to={`/blogs/${blog.id}`} className="read-more">Read More</Link>
                </div>
            </div>
          ))}
        </div>   
      </div>
    </div>
  );
};

export default Blog;
