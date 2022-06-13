import { useState } from "react";
import "./newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(email);
    setEmail("");
  };
  return (
    <div className="news-wrapper">
      {submitted ? (
        <>Thank you for signing your email: {submitted}!</>
      ) : (
        <>
          <div className="news-title">Receive tips right in your inbox!</div>

          <form onSubmit={(e) => handleSubmit(e)} className="news-form">
            <input
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
            <button>Sign up</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Newsletter;
