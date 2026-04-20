import { useState, useEffect } from "react";
import "./GlassCard.css";
import StarBorderButton from "../StarBorderButton";

const data = [
  {
    
    logo: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260227/MMlOVLYCrQ/t1.webp", // example
    year: "2026",
    duration: "2h 11m",
    genre: "Drama ",
    desc: "Sri Chidambaram Garu is the story of a broken young man who hides behind shame and a borrowed name, ...",
    image: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260225/MJhbgbiKcC/h1.jpg",
  },
  {
    title: "Dark",
    logo: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260414/NaxfKLkRYu/t1.webp", // no logo → fallback text
    year: "2026",
    duration: "Season 1",
    genre: "Family Drama",
    
    desc: "Maa Inti Katha follows the childhood and coming-of-age journey of two brothers growing up around the...",
    image: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260416/NewAXywdTE/h1.jpg",
  },
  {
    
    logo: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260227/MMpZqJtY9I/t1.webp",
    year: "2025",
    duration: "Season 2",
    genre: "Thriller",
    
    desc: "Kanakam, a brave young woman, becomes the first lady constable from her village. When she's posted t...",
    image: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/LcGOUDd1PM/h1.jpg",
  },

   {
    
    logo: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260227/MMljbrEFqi/t1.webp", // example
    year: "2025",
    duration: "2h 7m",
    genre: "Romantic",
    desc: "After failing EAMCET, Akhil joins coaching where he meets Khatyayani. Despite her odd rejection, he ...",
    image: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7j7XE1xo/h1.jpg",
  },
  {
    title: "Dark",
    logo: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260418/NhgnvESN6G/t1.webp", // no logo → fallback text
    year: "2026",
    duration: "38m ",
    genre: "Romantic Drama",
    
    desc: "An emotional journey from the warmth of new love to its painful unraveling. On their third anniversa...",
    image: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260418/NiGVTeOmUS/h1.webp",
  },
  {
    
    logo: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260408/NRezCn0OO0/t1.webp",
    year: "2026",
    duration: "2h 15m",
    genre: "Intense Love Drama",
    
    desc: "The story follows Arjun, a lonely aspiring cameraman who loses hope in life and even considers endin...",
    image: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260408/NRewv4LIyu/h1.jpg",
  },
];



export default function GlassCard({ title = "Trending Now" }) {
  const [current, setCurrent] = useState(1);
  const [direction, setDirection] = useState("");
  const [fade, setFade] = useState(false);

  const handlePrev = () => {
    setDirection("left");
    setFade(true);

    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + data.length) % data.length);
      setFade(false);
    }, 1);
  };

  const handleNext = () => {
    setDirection("right");
    setFade(true);

    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % data.length);
      setFade(false);
    }, 1);
  };

  // 🔥 AUTO SCROLL
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [current]);

  const prevIndex = (current - 1 + data.length) % data.length;
  const nextIndex = (current + 1) % data.length;

  return (
    <div className="gc-wrapper">

      {/* 🔥 HEADING */}
      <h2 className="gc-heading">{title}</h2>

      <div className={`gc-main ${direction} ${fade ? "fade" : ""}`}>

        {/* LEFT */}
        <div className="gc-card gc-left">
          <img src={data[prevIndex].image} alt="" />
        </div>

        {/* CENTER */}
        <div className="gc-card gc-center">
          <img src={data[current].image} alt="" />

          <div className="gc-overlay">
            <div className="gc-info">

              {/* LOGO OR TITLE */}
              {data[current].logo ? (
                <img
                  src={data[current].logo}
                  alt={data[current].title}
                  className="gc-title-logo"
                />
              ) : (
                <h2 className="gc-title-text">{data[current].title}</h2>
              )}

              <p className="gc-meta">
                {data[current].year} • {data[current].genre} •{" "}
                {data[current].duration}
              </p>

              <p className="gc-desc">{data[current].desc}</p>
            </div>

            <div className="gc-actions">
              <StarBorderButton className="play">▶ Play</StarBorderButton>
              <StarBorderButton className="list">+ My List</StarBorderButton>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="gc-card gc-right">
          <img src={data[nextIndex].image} alt="" />
        </div>

        {/* NAV */}
        <button className="gc-arrow left" onClick={handlePrev}>
          ‹
        </button>

        <button className="gc-arrow right" onClick={handleNext}>
          ›
        </button>

      </div>
    </div>
  );
}