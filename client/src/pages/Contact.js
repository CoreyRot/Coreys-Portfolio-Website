import React, { useState } from "react";
import axios from "axios";
import "../styles/Contact.css";

const Contact = () => {
  const [formType, setFormType] = useState("chat");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    jobTitle: "",
    workType: [],
    salaryRange: "",
    message: "",
    file: null,
    uploadedFile: null,
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formDataToSend.append(`${key}[]`, v));
        } else if (value && key !== "uploadedFile") {
          formDataToSend.append(key, value);
        }
      });

      formDataToSend.append("formType", formType);

      const response = await axios.post(
        "https://coreys-portfolio-website.onrender.com/api/contact",
        formDataToSend
      );

      setStatus(response.data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        jobTitle: "",
        workType: [],
        salaryRange: "",
        message: "",
        file: null,
        uploadedFile: response.data.file || null,
      });
      setStep(1);
    } catch (error) {
      setStatus(error.response?.data?.message || "Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="contact-background">
        <h2 className="section-title">How can I help?</h2>
        <p className="contact-subtitle">
          Do you have a question or are you interested in working with me?
        </p>

        <div className="form-group">
          <label className="form-label" htmlFor="inquiry-type">
            Select Inquiry Type:
          </label>
          <select
            id="inquiry-type"
            className="dropdown"
            value={formType}
            onChange={(e) => {
              setFormType(e.target.value);
              setStep(1);
            }}
          >
            <option value="job">Job Opportunity</option>
            <option value="freelance">Freelance</option>
            <option value="chat">Just to Chat</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-grid">
            {step === 1 && (
              <>
                <FormInput label="First Name:" name="firstName" type="text" value={formData.firstName} onChange={handleChange} required />
                <FormInput label="Last Name:" name="lastName" type="text" value={formData.lastName} onChange={handleChange} required />
                <FormInput label="Email:" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <FormInput label="Phone Number:" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </>
            )}

            {step === 2 && (formType === "job" || formType === "freelance") && (
              <>
                <FormInput label="Company Name:" name="company" type="text" value={formData.company} onChange={handleChange} required />
                <FormInput label="Company Website:" name="website" type="url" value={formData.website} onChange={handleChange} />

                {formType === "job" && (
                  <>
                    <FormInput label="Job Title:" name="jobTitle" type="text" value={formData.jobTitle} onChange={handleChange} required />
                    <FormInput label="Job Description (File Upload):" name="file" type="file" onChange={handleFileChange} />

                    <div className="form-group full-width">
                      <label className="form-label">Work Type:</label>
                      <div className="checkbox-group">
                        {["Onsite", "Hybrid", "Remote"].map((type) => (
                          <label key={type}>
                            <input
                              type="checkbox"
                              value={type}
                              checked={formData.workType.includes(type)}
                              onChange={(e) => {
                                const { value, checked } = e.target;
                                setFormData((prev) => {
                                  const updatedWorkType = checked
                                    ? [...prev.workType, value]
                                    : prev.workType.filter((t) => t !== value);
                                  return { ...prev, workType: updatedWorkType };
                                });
                              }}
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>

                    <FormDropdown label="Salary Range:" name="salaryRange" value={formData.salaryRange} onChange={handleChange} options={["Select", "0-40000", "40000-60000", "60000-80000", "80000-100000", "100000+"]} fullWidth />
                  </>
                )}
              </>
            )}

            {(step === 3 || formType === "chat") && (
              <FormTextarea label="Message:" name="message" value={formData.message} onChange={handleChange} required fullWidth />
            )}
          </div>

          {formData.uploadedFile && (
            <div className="uploaded-file">
              <p>Uploaded File:</p>
              <a href={`https://coreys-portfolio-website.onrender.com/uploads/${formData.uploadedFile}`} target="_blank" rel="noopener noreferrer">
                {formData.uploadedFile}
              </a>
            </div>
          )}
          <div className="button-group flex-container">
            {step > 1 && (
              <button type="button" className="btn-prev" onClick={() => setStep(step - 1)}>
                Previous
              </button>
            )}
            {step === 3 || formType === "chat" ? (
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Sending..." : "Submit"}
              </button>
            ) : (
              <button type="button" className="btn-next" onClick={() => setStep(step + 1)}>
                Next
              </button>
            )}
          </div>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>
    </div>
  );
};

// Reusable Form Components
const FormInput = ({ label, name, type, value, onChange, required, fullWidth }) => (
  <div className={`form-group ${fullWidth ? "full-width" : ""}`}>
    <label className="form-label" htmlFor={name}>{label}</label>
    <input id={name} className="form-input" type={type} name={name} value={value} onChange={onChange} required={required} />
  </div>
);

const FormTextarea = ({ label, name, value, onChange, required, fullWidth }) => (
  <div className={`form-group ${fullWidth ? "full-width" : ""}`}>
    <label className="form-label" htmlFor={name}>{label}</label>
    <textarea id={name} className="form-textarea" name={name} value={value} onChange={onChange} required={required} />
  </div>
);

const FormDropdown = ({ label, name, value, onChange, options, fullWidth }) => (
  <div className={`form-group ${fullWidth ? "full-width" : ""}`}>
    <label className="form-label">{label}</label>
    <select className="dropdown" name={name} value={value} onChange={onChange}>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </div>
);

export default Contact;
