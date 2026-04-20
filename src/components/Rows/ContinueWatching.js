import React, { useRef, useEffect, useState } from "react";
import "./ContinueWatching.css";

const data = [
  {
    title: "Show 1",
    img: "	https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260408/NRevmoL0sq/h2.webp",
    progress: 60,
    duration: "30m left",
  },
  {
    title: "Show 2",
    img: "	https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260212/LxdUC8j0QS/h2.webp",
    progress: 40,
    duration: "10m left",
  },
  {
    title: "Show 3",
    img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260218/M7WBDGhFvk/h2.webp",
    progress: 75,
    duration: "5m left",
  },
  {
    title: "Show 4",
    img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260401/NG0zjJo9lw/h2.webp",
    progress: 20,
    duration: "2h 2m left",
  },
  {
    title: "Show 1",
    img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/LcGOV4zbrU/h2.webp",
    progress: 60,
    duration: "2m left",
  },
  {
    title: "Show 2",
    img: "	https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc6rsIM5jM/h2.webp",
    progress: 40,
    duration: "10m left",
  },
  {
    title: "Show 3",
    img: "	https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/LcGAGPb3T6/h2.webp",
    progress: 75,
    duration: "5m left",
  },
  {
    title: "Show 4",
    img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/LcGKSb7iRk/h2.webp",
    progress: 20,
    duration: "15m left",
  },
];

function ContinueWatching({ title = "Continue Watching" }) {
  const rowRef = useRef();

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const scroll = (dir) => {
    rowRef.current.scrollBy({
      left: dir === "left" ? -1000 : 1000,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = rowRef.current;

    const checkScroll = () => {
      const scrollLeft = el.scrollLeft;
      const maxScroll = el.scrollWidth - el.clientWidth;

      setShowLeft(scrollLeft > 10);
      setShowRight(scrollLeft < maxScroll - 10);
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll);

    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  // 🔥 3D TILT
  useEffect(() => {
    const container = rowRef.current;

    const handleMove = (e) => {
      const card = e.target.closest(".cw-card");
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = (y - rect.height / 2) / 60;
      const rotateY = (x - rect.width / 2) / 60;

      card.style.setProperty("--rx", `${-rotateX}deg`);
      card.style.setProperty("--ry", `${rotateY}deg`);
    };

    const handleLeave = (e) => {
      const card = e.target.closest(".cw-card");
      if (!card) return;

      card.style.setProperty("--rx", `0deg`);
      card.style.setProperty("--ry", `0deg`);
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave, true);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave, true);
    };
  }, []);

  return (
    <div className="cw-container">
      <h2 className="cw-title">{title}</h2>

      {/* LEFT */}
      {data.length > 7 && showLeft && (
      <button className="cw-arrow left" onClick={() => scroll("left")}>
     ❮
      </button>
)}
      
      <div className="cw-posters" ref={rowRef}>
        {data.map((item, i) => (
          <div className="cw-card" key={i}>
            <img src={item.img} alt={item.title} />

            {/* ▶ PLAY */}
            <div className="cw-overlay">
              <div className="cw-play">
              <span className="play-icon">▶</span>

              </div>
            </div>

            {/* ⏱ DURATION */}
            <div className="cw-duration">{item.duration}</div>

            {/* 📊 PROGRESS */}
            <div className="cw-progress">
              <div
                className="cw-progress-fill"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      {data.length > 7 && showRight && (
     <button className="cw-arrow right" onClick={() => scroll("right")}>
      ❯
     </button>
)}
      
    </div>
  );
}

export default ContinueWatching;