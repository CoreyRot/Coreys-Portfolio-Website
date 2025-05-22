import '../../styles/components/tiles/Contact.css';
import { AiFillLinkedin, AiFillMail } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="content">
      <div className="contact-container">
        <h2 className='section-title'>Let's work together on your next project</h2>
        
        <ul className="contact-icons-container">
          <li className="contact-icon">
            <AiFillMail className="icon" />
          </li>
          
          <li className="contact-icon">
            <FaPhoneAlt className="icon" />
          </li>
          
          <li className="contact-icon">
            <AiFillLinkedin className="icon" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;