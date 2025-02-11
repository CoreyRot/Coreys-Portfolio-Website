import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import he from "he";
import axios from "axios";
import "../styles/BlogDetails.css";

const PROXY_URL = "https://api.allorigins.win/raw?url=";
const WORDPRESS_API_URL = "http://coreys-headless-blog.great-site.net/wp-json/wp/v2/posts?_embed&orderby=date&order=asc";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!id) {
      console.error("❌ Invalid Blog ID:", id);
      setLoading(false);
      return;
    }

    axios.get(`${PROXY_URL}${encodeURIComponent(WORDPRESS_API_URL)}`)
      .then((response) => {
        setBlogs(response.data);

        // ✅ Find the current blog post
        const foundIndex = response.data.findIndex((b) => b.id.toString() === id);
        if (foundIndex !== -1) {
          setBlog(response.data[foundIndex]);
        } else {
          console.error("❌ Blog not found in list:", id);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching blogs:", error);
        setLoading(false);
      });
  }, [id]);

  const navigateToBlog = (direction) => {
    const currentIndex = blogs.findIndex((b) => b.id.toString() === blog.id.toString());
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "prev" && currentIndex > 0) {
      newIndex = currentIndex - 1;
      navigate(`/blogs/${blogs[newIndex].id}`);
    } else if (direction === "next" && currentIndex < blogs.length - 1) {
      newIndex = currentIndex + 1;
      navigate(`/blogs/${blogs[newIndex].id}`);
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
        <h1>{he.decode(blog.title.rendered)}</h1>
        <button className="back-button" onClick={handleBack}>Back to Blogs</button>
      </header>
      <div className="container">
        <div className="blog-main blog-background">
          <div className="blog-image">
            <img 
              src={blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/400x250"} 
              alt={blog.title.rendered}
            />
          </div>
          <div className="blog-content">
            <div dangerouslySetInnerHTML={{ __html: blog.content.rendered }}></div>
          </div>
        </div>

        {/* ✅ Blog Navigation: Ensures Next & Previous buttons work properly */}
        <div className="blog-navigation">
          {blogs.length > 1 && (
            <>
              {blogs.findIndex((b) => b.id.toString() === blog.id.toString()) > 0 && (
                <button className="prev-button" onClick={() => navigateToBlog("prev")}>Previous Blog</button>
              )}
              {blogs.findIndex((b) => b.id.toString() === blog.id.toString()) < blogs.length - 1 && (
                <button className="next-button" onClick={() => navigateToBlog("next")}>Next Blog</button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
