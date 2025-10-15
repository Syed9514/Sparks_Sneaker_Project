import { useEffect, useRef, useState } from "react";
import "./WhyUs.css";

export default function WhyUs() {
  const storyRef = useRef();
  const [visible, setVisible] = useState(false);
  const textRef = useRef();
  const [textVisible, setTextVisible] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.target === storyRef.current && entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
        if (entry.target === textRef.current && entry.isIntersecting) {
          setTextVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (storyRef.current) observer.observe(storyRef.current);
    if (textRef.current) observer.observe(textRef.current);

    return () => {
      if (storyRef.current) observer.unobserve(storyRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);

  
  return (
    <section className="whyus-section" aria-labelledby="whyus-title">
      <div className="section-header">
        <h2 id="whyus-title" className="whyus-title">Why Shop With Us?</h2>
        <div className="section-break" aria-hidden="true" />
      </div>

      <div className="whyus-container">
        <div ref={storyRef} className={`whyus-text ${visible ? "in-view" : ""}`}>
          <p className="lead">We make sneaker shopping effortless and reliable. Here's why customers keep choosing us:</p>
          <ul>
            <li><span className="bullet">✓</span><span>100% Authentic Sneakers</span></li>
            <li><span className="bullet">🚚</span><span>Fast & Free Shipping</span></li>
            <li><span className="bullet">🔁</span><span>Easy 7-Day Returns</span></li>
            <li><span className="bullet">🔒</span><span>Secure Payments</span></li>
            <li><span className="bullet">🎟️</span><span>Limited Drops & Exclusive Releases</span></li>
          </ul>
        </div>

        <aside ref={textRef} className={`brand-story ${textVisible ? "in-view" : ""}`}>
          <h3>Our Story</h3>
          <p>
            Founded by sneaker lovers, Syed Sneakers began as a small passion project to curate the best styles for collectors and casuals alike. We focus on quality, rarity, and fast service — so your steps always stand out.
          </p>
          <p className="small">We launch limited drops regularly — subscribe to our newsletter for early access.</p>
        </aside>
      </div>
    </section>
  );

}
