import React, { useState } from "react";
import axios from "axios";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post("https://coreys-portfolio-website.onrender.com/api/contact", formData);
      setStatus(response.data.message);
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      setStatus("Error sending message.");
    }
  };

  return (
    <div className="container">
      <div className="contact-background">
        <div className="grid">
          <div className="cell">
            <h2 className="section-title">Contact Me</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />

              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />

              <label>Message:</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required />

              <button type="submit">Send</button>
            </form>
            {status && <p className="status-message">{status}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
