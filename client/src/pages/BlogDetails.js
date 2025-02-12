import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import he from "he";
import axios from "axios";
import "../styles/BlogDetails.css";

const WORDPRESS_API_URL = "https://public-api.wordpress.com/rest/v1.1/sites/free59822.wordpress.com/posts/?orderby=date&order=asc";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(WORDPRESS_API_URL)
      .then((response) => {
        let posts = response.data.posts;

        // ✅ Ensure the posts are sorted by date (oldest first)
        posts.sort((a, b) => new Date(a.date) - new Date(b.date));

        setBlogs(posts);

        // ✅ Find the current blog post by slug
        const foundPost = posts.find((post) => post.slug === id || post.ID.toString() === id);

        if (foundPost) {
          setBlog(foundPost);
        } else {
          console.error("❌ Blog not found:", id);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching blogs:", error);
        setLoading(false);
      });
  }, [id]);

  const navigateToBlog = (direction) => {
    const currentIndex = blogs.findIndex((b) => b.slug === blog.slug);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "prev" && currentIndex > 0) {
      newIndex = currentIndex - 1;
      navigate(`/blogs/${blogs[newIndex].slug}`);
    } else if (direction === "next" && currentIndex < blogs.length - 1) {
      newIndex = currentIndex + 1;
      navigate(`/blogs/${blogs[newIndex].slug}`);
    }
  };

  const handleBack = () => {
    navigate("/#blogs", { replace: true });
    window.location.reload();
  };

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <section className="blog-detail">
      <header className="blog-header">
        <div className="blog-header-grid">
          <h1>{he.decode(blog.title)}</h1>
          <button className="back-button" onClick={handleBack}>Back to Posts</button>
        </div>
      </header>
      <div className="container">
        <div className="blog-main blog-background">
          <div className="blog-image">
            <img 
              src={blog.featured_image || "https://via.placeholder.com/400x250"} 
              alt={blog.title}
            />
          </div>
          <div className="blog-content">
            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </div>
        </div>

        {/* ✅ Blog Navigation: Fixes Next & Previous Navigation */}
        <div className="blog-navigation">
          {blogs.length > 1 && (
            <>
              {blogs.findIndex((b) => b.slug === blog.slug) > 0 && (
                <button className="prev-button" onClick={() => navigateToBlog("prev")}>Previous Post</button>
              )}
              {blogs.findIndex((b) => b.slug === blog.slug) < blogs.length - 1 && (
                <button className="next-button" onClick={() => navigateToBlog("next")}>Next Post</button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
