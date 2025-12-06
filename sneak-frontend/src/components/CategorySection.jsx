import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CategorySection.css";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: "Men",
    image: "/assets/categories/men.png",
    path: "/men",
    key: "men"
  },
  {
    name: "Women",
    image: "/assets/categories/women.png",
    path: "/women",
    key: "women"
  },
  {
    name: "Kids",
    image: "/assets/categories/kid.png",
    path: "/kids",
    key: "kids"
  },
];

export default function CategorySection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // MatchMedia for Responsive Animations
      ScrollTrigger.matchMedia({

        // Desktop
        "(min-width: 769px)": function () {
          // 1. Reveal Layer Slide Up
          tl.to(".category-reveal-layer", {
            height: 0,
            duration: 1.4,
            ease: "expo.inOut"
          })

            // 2. Title Fade Up
            .fromTo(titleRef.current, {
              opacity: 0,
              y: 50
            }, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out"
            }, "-=0.8")

            // 3. Staggered Card Entrance
            // Men (Left)
            .fromTo(".category-card.men", { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.5")
            // Women (Center - moves up)
            .fromTo(".category-card.women", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.8")
            // Kids (Right)
            .fromTo(".category-card.kids", { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.8");

          // 4. Micro Parallax (Scroll Driven)
          categories.forEach((cat) => {
            gsap.to(`.category-card.${cat.key.toLowerCase()} .category-bg`, {
              y: -15, // Move image slightly up
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            });
          });
        },

        // Mobile
        "(max-width: 768px)": function () {
          // 1. Reveal Layer (Slide Up)
          tl.to(".category-reveal-layer", {
            height: 0,
            duration: 1.2,
            ease: "expo.out"
          })

            // 2. Title
            .fromTo(titleRef.current, {
              opacity: 0,
              y: 30
            }, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            }, "-=0.6")

            // 3. Vertical Stack Stagger
            .fromTo(".category-card", {
              y: 40,
              opacity: 0
            }, {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              duration: 0.8,
              ease: "power2.out"
            }, "-=0.4");
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="shopByCategory" className="category-section" ref={sectionRef}>
      {/* Reveal Layer */}
      <div className="category-reveal-layer"></div>

      <div className="category-container">

        <h2 className="category-title" ref={titleRef}>
          Shop by Category
        </h2>

        <div className="category-grid" ref={gridRef}>
          {categories.map((cat) => (
            <Link to={cat.path} key={cat.name} className={`category-link ${cat.key.toLowerCase()}-link`}>
              <div className={`category-card ${cat.key.toLowerCase()}`}>

                {/* Background Image */}
                <div
                  className="category-bg"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />

                {/* Overlay & Text */}
                <div className="category-overlay">
                  <h3>{cat.name}</h3>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}