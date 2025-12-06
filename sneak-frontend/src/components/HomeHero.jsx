import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./HomeHero.css";

export default function HomeHero() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const isDesktop = window.innerWidth >= 900;

      // --- INITIAL STATES ---
      gsap.set(".hero-tag", { opacity: 0, y: 10 });
      gsap.set(".hero-title-char", { opacity: 0, y: 30 });
      gsap.set(".hero-subtitle", { opacity: 0, y: 20 });
      gsap.set(".hero-action-area", { opacity: 0, y: 20 });
      gsap.set(".hero-circle-mask", { scale: 0, opacity: 0 });
      gsap.set(".hero-img", { opacity: 0, scale: 0.8 });

      if (isDesktop) {
        // Desktop Specific Init: Start Text in Center
        // We want the text to start roughly in the "Center" of the screen and move to the "Left Column".
        // Screen Center is 50vw. Left Column Center is 25vw. Diff is 25vw.
        gsap.set(".hero-text-area", { x: "25vw" });
      }

      // --- ANIMATION SEQUENCE ---

      // 1. Tag Reveal
      tl.to(".hero-tag", { opacity: 1, y: 0, duration: 0.5 });

      // 2. Title Reveal (Chars)
      tl.to(".hero-title-char", {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.2");

      if (isDesktop) {
        // 3. Desktop: Move Title Left (25vw -> 0)
        tl.to(".hero-text-area", {
          x: 0,
          duration: 1.5,
          ease: "power4.inOut",
        }, "+=0.1");
      }

      // 4. Subtitle Reveal
      // On desktop, this happens after move starts (or during).
      tl.to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, isDesktop ? "<50%" : "-=0.2");

      // 5. Circle Expand & Sneaker Reveal
      // This should happen on the RIGHT side.
      tl.to(".hero-circle-mask", {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "expo.inOut",
      }, isDesktop ? "<" : "-=0.2")
        .to(".hero-img", {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        }, "-=1.0");

      // 6. Button Reveal
      tl.to(".hero-action-area", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.5");

    }, comp);

    return () => ctx.revert();
  }, []);

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="hero-title-char" style={{ display: "inline-block", minWidth: char === " " ? "0.3em" : "auto" }}>
        {char}
      </span>
    ));
  };

  return (
    <section className="home-hero" ref={comp}>
      <div className="hero-grid">

        {/* UPPER/LEFT Content: Tag, Title, Subtitle */}
        <div className="hero-text-area">
          <span className="hero-tag">New Collection 2025</span>
          <h1 className="hero-title">
            <div className="hero-title-line">
              {splitText("Step Into")}
            </div>
            <div className="hero-title-line highlight-text">
              {splitText("The Future.")}
            </div>
          </h1>
          <p className="hero-subtitle">
            Experience the ultimate fusion of comfort and street culture. <br className="hidden-mobile" />
            Limited drops available now.
          </p>
        </div>

        {/* MIDDLE/RIGHT Content: Visuals */}
        <div className="hero-visual-area">
          <div className="hero-circle-mask">
            {/* Make sure image path is correct */}
            <img src="/assets/shoe6-nobg.png" alt="Exclusive Sneaker" className="hero-img" />
          </div>
        </div>

        {/* BOTTOM/LEFT Content: Button */}
        <div className="hero-action-area">
          <Link to="/collection" className="hero-btn">Shop Now</Link>
        </div>

      </div>
    </section>
  );
}