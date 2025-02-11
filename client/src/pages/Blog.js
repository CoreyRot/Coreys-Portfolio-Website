import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import he from "he"; // Helps decode HTML entities in titles
import "../styles/Blog.css";

const WORDPRESS_API_URL = "https://public-api.wordpress.com/rest/v1.1/sites/free59822.wordpress.com/posts/";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);

  useEffect(() => {
    axios.get(WORDPRESS_API_URL)
      .then((response) => {
        let posts = response.data.posts;

        // ✅ Sort posts manually (oldest first)
        posts.sort((a, b) => new Date(a.date) - new Date(b.date));

        // ✅ Featured Blog: Oldest post
        const featured = posts[0];

        // ✅ Other Blogs: Next 4 oldest posts
        const nonFeaturedBlogs = posts.slice(1, 5);

        setFeaturedBlog(featured);
        setOtherBlogs(nonFeaturedBlogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="blog-background">
        <h2 className="section-title">Posts</h2>

        {/* ✅ Featured Blog */}
        {featuredBlog && (
          <div className="featured-blog">
            <div className="featured-image">
              <img 
                src={featuredBlog.featured_image || "https://via.placeholder.com/600x400"} 
                alt={featuredBlog.title} 
              />
              <span className="featured-tag">Featured</span>
            </div>
            <div className="featured-content">
              <p className="blog-date">{new Date(featuredBlog.date).toLocaleDateString()}</p>
              <h3>{he.decode(featuredBlog.title)}</h3>
              <p dangerouslySetInnerHTML={{ __html: featuredBlog.excerpt }}></p>
              <Link to={`/blogs/${featuredBlog.ID}`} className="read-more">Read More</Link>
            </div>
          </div>
        )}

        {/* ✅ Blog Grid */}
        <div className="blog-grid">
          {otherBlogs.map((blog) => (
            <div key={blog.ID} className="blog-item">
              <img 
                src={blog.featured_image || "https://via.placeholder.com/400x250"} 
                alt={blog.title} 
              />
              <div className="blog-item-content">
                <h4>{he.decode(blog.title)}</h4>
                <p dangerouslySetInnerHTML={{ __html: blog.excerpt }}></p>
                <Link to={`/blogs/${blog.ID}`} className="read-more">Read More</Link>
              </div>
            </div>
          ))}
        </div>   
      </div>
    </div>
  );
};

export default Blog;
