import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import he from "he";
import axios from "axios";
import "../styles/BlogDetails.css";

const WORDPRESS_API_URL =
  "https://public-api.wordpress.com/rest/v1.1/sites/free59822.wordpress.com/posts/?orderby=date&order=asc";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get(WORDPRESS_API_URL);
      let posts = response.data.posts || [];

      if (!Array.isArray(posts) || posts.length === 0)
        throw new Error("No posts available.");

      posts.sort((a, b) => new Date(a.date) - new Date(b.date));

      setBlogs(posts);

      const foundPost = posts.find(
        (post) => post.slug === id || post.ID.toString() === id
      );
      if (!foundPost) throw new Error("Blog not found.");

      setBlog(foundPost);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const navigateToBlog = (direction) => {
    if (!blogs.length || !blog) return;

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

  const handleBack = () => {
    navigate("/#blogs");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">⚠️ {error}</p>;

  return (
    <section className="blog-detail">
      <BlogHeader title={blog.title} handleBack={handleBack} />
      <div className="container">
        <div className="blog-main blog-background">
          <BlogImage imageUrl={blog.featured_image} title={blog.title} />
          <BlogContent content={blog.content} />
        </div>

        {/* ✅ Blog Navigation */}
        <BlogNavigation blogs={blogs} blog={blog} navigateToBlog={navigateToBlog} />
      </div>
    </section>
  );
};

/** ✅ Reusable Components */
const BlogHeader = ({ title, handleBack }) => (
  <header className="blog-header">
    <div className="blog-header-grid">
      <h1>{he.decode(title)}</h1>
      <button className="back-button" onClick={handleBack}>
        <span>Back to Posts</span>
      </button>
    </div>
  </header>
);

const BlogImage = ({ imageUrl, title }) => (
  <div className="blog-image">
    <img
      src={imageUrl || "https://via.placeholder.com/400x250"}
      alt={he.decode(title)}
    />
  </div>
);

const BlogContent = ({ content }) => (
  <div className="blog-content">
    <div dangerouslySetInnerHTML={{ __html: content }}></div>
  </div>
);

const BlogNavigation = ({ blogs, blog, navigateToBlog }) => {
  const currentIndex = blogs.findIndex((b) => b.slug === blog.slug);

  return (
    <div className="blog-navigation">
      {blogs.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button className="prev-button" onClick={() => navigateToBlog("prev")}>
              <span>Previous</span>
            </button>
          )}
          {currentIndex < blogs.length - 1 && (
            <button className="next-button" onClick={() => navigateToBlog("next")}>
              <span>Next</span>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default BlogDetails;