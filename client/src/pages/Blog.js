import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import he from "he"; // Helps decode HTML entities in titles
import "../styles/Blog.css";

const WORDPRESS_API_URL = "https://public-api.wordpress.com/rest/v1.1/sites/free59822.wordpress.com/posts/";

const Blog = () => {
  const [blogs, setBlogs] = useState({ featured: null, others: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch Blog Posts
  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get(WORDPRESS_API_URL);
      let posts = response.data.posts || [];

      if (posts.length === 0) {
        throw new Error("No posts available.");
      }

      // ✅ Sort posts by oldest first
      posts.sort((a, b) => new Date(a.date) - new Date(b.date));

      setBlogs({
        featured: posts[0] || null,
        others: posts.slice(1, 5),
      });
    } catch (err) {
      console.error("❌ Error fetching blogs:", err);
      setError(err.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">⚠️ {error}</p>;

  return (
    <div className="container">
      <div className="blog-background">
        <h2 className="section-title">Posts</h2>

        {/* ✅ Featured Blog */}
        {blogs.featured && <FeaturedBlog blog={blogs.featured} />}

        {/* ✅ Blog Grid */}
        <div className="blog-grid">
          {blogs.others.map((blog) => <BlogItem key={blog.ID} blog={blog} />)}
        </div>
      </div>
    </div>
  );
};

// ✅ Featured Blog Component
const FeaturedBlog = ({ blog }) => (
  <div className="featured-blog">
    <div className="featured-image">
      <img 
        src={blog.featured_image || "https://via.placeholder.com/600x400"} 
        alt={he.decode(blog.title) || "Featured Blog"} 
      />
      <span className="featured-tag">Featured</span>
    </div>
    <div className="featured-content">
      <p className="blog-date">{new Date(blog.date).toLocaleDateString()}</p>
      <h3>{he.decode(blog.title)}</h3>
      <p dangerouslySetInnerHTML={{ __html: blog.excerpt }}></p>
      <Link to={`/blogs/${blog.ID}`} className="read-more">Read More</Link>
    </div>
  </div>
);

// ✅ Blog Grid Item Component
const BlogItem = ({ blog }) => (
  <div className="blog-item">
    <img 
      src={blog.featured_image || "https://via.placeholder.com/400x250"} 
      alt={he.decode(blog.title) || "Blog Post"} 
    />
    <div className="blog-item-content">
      <h4>{he.decode(blog.title)}</h4>
      <p dangerouslySetInnerHTML={{ __html: blog.excerpt }}></p>
      <Link to={`/blogs/${blog.ID}`} className="read-more">Read More</Link>
    </div>
  </div>
);

export default Blog;