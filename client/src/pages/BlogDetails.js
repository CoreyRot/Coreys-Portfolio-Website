import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import he from "he";
import axios from "axios";
import "../styles/BlogDetails.css";

const WORDPRESS_API_URL = "https://public-api.wordpress.com/rest/v1.1/sites/free59822.wordpress.com/posts/";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch Blog Posts
  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get(WORDPRESS_API_URL);
      let posts = response.data.posts || [];

      if (posts.length === 0) throw new Error("No posts available.");

      // ✅ Ensure the posts are sorted by date (oldest first)
      posts.sort((a, b) => new Date(a.date) - new Date(b.date));

      setBlogs(posts);

      // ✅ Find the current blog post by slug or ID
      const foundPost = posts.find((post) => post.slug === id || post.ID.toString() === id);
      if (!foundPost) throw new Error("Blog not found.");

      setBlog(foundPost);
    } catch (err) {
      console.error("❌ Error fetching blogs:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // ✅ Handle Blog Navigation
  const navigateToBlog = (direction) => {
    const currentIndex = blogs.findIndex((b) => b.slug === blog?.slug);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "prev" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === "next" && currentIndex < blogs.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      return;
    }

    navigate(`/blogs/${blogs[newIndex].slug}`);
  };

  // ✅ Handle Back Button
  const handleBack = () => {
    navigate("/#blogs");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">⚠️ {error}</p>;

  return (
    <section className="blog-detail">
      <header className="blog-header">
        <div className="blog-header-grid">
          <h1>{he.decode(blog.title)}</h1>
          <button className="back-button" onClick={handleBack}>
            <span>Back to Posts</span>
          </button>
        </div>
      </header>
      <div className="container">
        <div className="blog-main blog-background">
          <div className="blog-image">
            <img 
              src={blog.featured_image || "https://via.placeholder.com/400x250"} 
              alt={he.decode(blog.title)}
            />
          </div>
          <div className="blog-content">
            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </div>
        </div>

        {/* ✅ Blog Navigation */}
        <div className="blog-navigation">
          {blogs.length > 1 && (
            <>
              {blogs.findIndex((b) => b.slug === blog.slug) > 0 && (
                <button className="prev-button" onClick={() => navigateToBlog("prev")}>
                  <span>Previous</span>
                </button>
              )}
              {blogs.findIndex((b) => b.slug === blog.slug) < blogs.length - 1 && (
                <button className="next-button" onClick={() => navigateToBlog("next")}>
                  <span>Next</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
