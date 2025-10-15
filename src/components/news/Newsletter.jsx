import { useState } from "react";
import "./Newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // simple simulated submit — in real app you'd post to an API
    setSubmitted(true);
    // keep email in localStorage briefly to avoid spam on refresh (optional)
    try {
      localStorage.setItem('newsletterEmail', email);
    } catch (err) {
      // ignore localStorage errors
    }
  };

  return (
    <section className="newsletter-section">
      {/* <h1 className="newsletter-page-title">NewsLetter</h1> */}
      <br/>
      <div className="newsletter-card">
        <div className="newsletter-left" aria-hidden="true">
          <svg width="160" height="160" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="newsletter-graphic">
            <path d="M3 8.5V18a2 2 0 0 0 2 2h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 6v-.5A2.5 2.5 0 0 0 18.5 3h-13A2.5 2.5 0 0 0 3 5.5V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 8l-9 6L3 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="newsletter-content">
          <h2 className="newsletter-title">Join Our Sneaker Community</h2>
          <p className="newsletter-sub">Stay in the loop with exclusive drops, offers & limited releases.</p>

          {!submitted ? (
            <form className="newsletter-form" onSubmit={handleSubmit} aria-label="Subscribe to newsletter">
              <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button type="submit" aria-label="Join now">Join Now</button>
            </form>
          ) : (
            <div className="newsletter-success" role="status" aria-live="polite">
              <strong>Thanks —</strong> you're on the list! Check your inbox for a welcome message.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
