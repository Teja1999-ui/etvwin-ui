import React, { useState, useRef, useEffect } from "react";
import "./Top10.css";
import StarBorderButton from "../StarBorderButton"; // add this at top

const data = [
  {
    title: "Sri Chidambaram Garu",
    year: "2026",
    rating: "U/A ",
    genre: "Drama",
    duration: "2h 11m",
    language: "Telugu",
    desc:
      "Sri Chidambaram Garu is the story of a broken young man who hides behind shame and a borrowed name.",
    img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260225/MJhbz7cAd6/v1.webp",
    bg: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260225/MJhbgbiKcC/h1.jpg",
    logo:
      "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260227/MMlOVLYCrQ/t1.webp",
  },
  {
    title: "Raju Weds Rambai",
    year: "2025",
    rating: "U/A 13+",
    genre: "Drama",
    duration: "2h 16m",
    language: "Telugu",
    desc:
      "Raju Weds Rambai is inspired by a real story of a carefree band drummer whose love for a compounders...",
    img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260225/MJ1jOIpmWu/v1.webp",
    bg: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7qdJYUBU/h1.jpg",
    logo:
      "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260227/MMlhySAprk/t1.webp",
  },
  {
    title: "Euphoria",
    year: "2026",
    rating: "A",
    genre:"Social Drama",
    language: "Telugu",
    desc:"A generation on the edge, where minor crimes surge, humanitarian values erode and adolescence drifts...",
    img:"https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260401/NG11YWLrxA/v1.webp",
    bg: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260401/NG10nd8DkO/h1.jpg",
    logo:"https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260227/MMpZqJtY9I/t1.webp",
  },
  {
    title: "Little Hearts",
    year: "2025",
    rating: "U/A 7+",
    genre:"Romantic",
    language: "Telugu",
    desc: "After failing EAMCET, Akhil joins coaching where he meets Khatyayani. Despite her odd rejection, he ...",
    img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7j9ynpQG/v1.webp",
    bg: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7j7XE1xo/h1.jpg",
    logo: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260227/MMljbrEFqi/t1.webp",
  },
   
   {
    title: "Committee Kurrollu",
    year: "2024",
    rating: "U/A ",
    genre: "Drama",
    duration: "2h 33m",
    language: "Telugu",
    desc:"Eleven friends face life-altering events during the village Jathara ritual. Every twelve years, they...",
    img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7OaZ61jM/v1.webp",
    bg: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7OYGszZ2/h1.webp",
    logo: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7OZTXUm0/t1.webp",
  },
   {
    title: "Anaganaa",
    year: "2025",
    rating: "U ",
    genre: "Drama",
    duration: "2h 16m",
    language: "Telugu",
    desc:"After losing his parents in a tragic accident, eight-year-old Vyas finds comfort in Rani Amma, who f...",
    img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260225/MK3PrSSo9A/v1.webp",
    bg: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7fXkpSyW/h1.webp",
    logo: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260227/MMlezOHE3s/t1.webp",
  },
   {
    title: "SherLockHomes",
    year: "2025",
    rating: " A ",
    genre: "Comedy Thriller",
    duration: "2h 8m",
    language: "Telugu",
    desc:"In 1991, on the night of Rajiv Gandhi`s visit to Vizag, a poor girl named Mary is murdered on the be...",
    img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7Tw0cNM0/v1.webp",
    bg: "	https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7TmrTpT6/h1.webp",
    logo: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7TqEgCKe/t1.webp",
  },
  {
    title: "Constable",
    year: "2026",
    rating: "U/A ",
    genre: "Thriller",
    duration: "2h 7m",
    language: "Telugu",
    desc:"In a gripping tale of justice and intrigue, a powerless constable witnesses hisniece's murder and ba...",
    img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260225/MJgkiQCBu4/v1.webp",
    bg: "	https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260225/MJgkMcUMUq/h1.webp",
    logo: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260227/MMlWImPuds/t1.webp",
  },
   {
    title: "Harom Hara",
    year: "2024",
    rating: " A ",
    genre: "Crime",
    duration: "2h 31m",
    language: "Telugu",
    desc:"Set in late 1980s, a story of an ordinary man who lost his job and facing financial hurdles, but all...",
    img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7N0TYBv6/v1.webp",
    bg: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7MhBOXnE/h1.webp",
    logo: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7Mj7SroW/t1.webp",
  },
   {
    title: "Arjun Chakravarthy",
    year: "2025",
    rating: "U/A ",
    genre: "Action Thriller",
    duration: "2h 6m",
    language: "Telugu",
    desc:"Arjun Chakravarthy, an aspiring kabaddi player, strives to overcome numerous obstacles, in order to ...",
    img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7pq4R17Y/v1.webp",
    bg: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7pavRwq8/h1.webp",
    logo: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7pfY8oDI/t1.webp",
  },
];


export default function Top10() {
  const [selected, setSelected] = useState(data[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [active, setActive] = useState(null);

  const rowRef = useRef();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const scroll = (dir) => {
    rowRef.current.scrollBy({
      left: dir === "left" ? -900 : 900,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = rowRef.current;

    const checkScroll = () => {
      if (!el) return;

      const scrollLeft = el.scrollLeft;
      const maxScroll = el.scrollWidth - el.clientWidth;

      setShowLeft(scrollLeft > 10);
      setShowRight(scrollLeft < maxScroll - 10);
    };

    checkScroll();

    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="top10-app">

      {/* ===== BANNER ===== */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${selected.bg})` }}
      >
        <div className="banner-overlay" />

        <div className="banner-content">

          <img src={selected.logo} className="banner-logo" alt="" />

          <p className="meta">
            {selected.year} | {selected.rating} |{" "}
            {selected.duration || selected.seasons} |{" "}
            {selected.genre} | {selected.language}
          </p>

          <div className="banner-main">

            <div className="poster">
              <img src={selected.img} alt="" />
              <span className="rank">#{selectedIndex + 1}</span>
            </div>

            <div className="banner-right">
              <h1>{selected.title}</h1>
              <p className="desc">{selected.desc}</p>

              <div className="buttons">
                 <StarBorderButton className="play" color="white">
                  ▶ Play
                 </StarBorderButton>

                <StarBorderButton className="list" color="white">
                    + My List
                </StarBorderButton>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===== TOP10 ===== */}
      <div className="top10-container row-container">
        <h2>Top 10 this week</h2>

        {/* ✅ LEFT ARROW */}
        {data.length > 7 && showLeft && (
          <button
            className="top10-arrow left"
            onClick={() => scroll("left")}
          >
            ❮
          </button>
        )}

        <div className="top10-row" ref={rowRef}>
          {data.map((item, i) => (
            <div
              key={i}
              className={`top10-card ${
                active === i ? "active" : active !== null ? "dim" : ""
              }`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => {
                setSelected(item);
                setSelectedIndex(i);
              }}
            >
              <img src={item.img} alt="" />
              <span className="top10-number">#{i + 1}</span>
            </div>
          ))}
        </div>

        {/* ✅ RIGHT ARROW */}
        {data.length > 7 && showRight && (
          <button
            className="top10-arrow right"
            onClick={() => scroll("right")}
          >
            ❯
          </button>
        )}
      </div>

    </div>
  );
}