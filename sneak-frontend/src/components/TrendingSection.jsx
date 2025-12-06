import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProducts } from "../features/products/productSlice";
import ProductCard from "./ProductCard";
import "./TrendingSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function TrendingSection() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [trending, setTrending] = useState([]);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // Fetch products
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts());
    }
  }, [status, dispatch]);

  // Set trending items
  useEffect(() => {
    if (products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setTrending(shuffled.slice(0, 3));
    }
  }, [products]);

  // GSAP Animation
  useLayoutEffect(() => {
    if (trending.length === 0) return; // Wait for data

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // When top of section hits 80% viewport
          toggleActions: "play none none reverse",
          markers: false
        }
      });

      // MatchMedia for responsiveness
      ScrollTrigger.matchMedia({

        // Desktop
        "(min-width: 769px)": function () {
          // 1. Reveal Layer Wipe (slide away)
          tl.to(".reveal-layer", {
            scaleX: 0,
            transformOrigin: "right center", // Wipes reveal from left to right? No, standard is layer moves away.
            // If scaleX: 0 and origin Right, it shrinks to the right. Content revealed from Left.
            duration: 1.4,
            ease: "expo.out"
          })

            // 2. Title Animation
            .fromTo(".trending-title", {
              opacity: 0,
              y: 40
            }, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out"
            }, "-=0.8") // Overlap

            // 3. Grid Cards Stagger
            .fromTo(".sneaker-card-wrapper", {
              opacity: 0,
              scale: 0.9,
              y: 60
            }, {
              opacity: 1,
              scale: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.8,
              ease: "back.out(1.7)" // "Pop" effect
            }, "-=0.6");
        },

        // Mobile
        "(max-width: 768px)": function () {
          // 1. Reveal Layer (Vertical or lighter wipe)
          tl.to(".reveal-layer", {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 1.0,
            ease: "expo.out"
          })

            // 2. Title
            .fromTo(".trending-title", {
              opacity: 0,
              y: 20
            }, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out"
            }, "-=0.6")

            // 3. Cards (Faster, smaller move)
            .fromTo(".sneaker-card-wrapper", {
              opacity: 0,
              scale: 0.95,
              y: 30
            }, {
              opacity: 1,
              scale: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.6,
              ease: "power2.out"
            }, "-=0.4");
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [trending]); // Re-run when cards render

  return (
    <section id="trending" className="trending-wrapper" ref={sectionRef}>

      {/* 1. Reveal Layer */}
      <div className="reveal-layer"></div>

      <div className="trending-content-container">
        {/* 2. Title */}
        <h2 className="trending-title">Trending Now</h2>

        {/* 3. Grid */}
        <div className="trending-grid" ref={gridRef}>
          {trending.length > 0 ? (
            trending.map((product) => (
              <div key={product._id} className="sneaker-card-wrapper">
                {/* CSS handles hover effects, JS handles entry */}
                <ProductCard sneaker={product} />
              </div>
            ))
          ) : (
            <div className="loading-state">Loading drops...</div>
          )}
        </div>
      </div>
    </section>
  );
}