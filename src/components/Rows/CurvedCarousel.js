import { useEffect, useState } from "react";
import "./CurvedCarousel.css";

const data = [
  { img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260225/MJhbz7cAd6/v1.webp" },
  { img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260225/MJ1jOIpmWu/v1.webp" },
  { img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7j9ynpQG/v1.webp" },
  { img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260212/LxthJEEmjA/v1.webp" },
  { img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/LcGOKNd2si/v1.webp" },
  { img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260401/NG11YWLrxA/v1.webp" },
  { img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7rIMINHs/v1.webp" },
  { img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260408/NRexcNsEbI/v1.webp" },
  { img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc6rDuURMG/v1.webp" },
  { img: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260318/Mso8pGLw4e/v1.webp" }
];

export default function CurvedCarousel() {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);

  const total = data.length;

  const next = () => {
    setPaused(true);
    setActive((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setPaused(true);
    setActive((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [paused, total]);

  useEffect(() => {
    if (!paused) return;

    const timeout = setTimeout(() => setPaused(false), 4000);
    return () => clearTimeout(timeout);
  }, [paused]);

  // 🔥 ONLY HOVERED CARD TILT
  const handleMove = (e) => {
    const card = e.currentTarget;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 18;
    const rotateX = -((y - midY) / midY) * 18;

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
  };

  const resetTilt = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", `0deg`);
    card.style.setProperty("--ry", `0deg`);
  };

  const getStyle = (index) => {
    let diff = index - active;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const spacing = 210;
    const curve = 80;

    const x = diff * spacing;
    const y = Math.abs(diff) * curve;

    const scale = diff === 0 ? 1.25 : 0.8;
    const rotate = diff * 10;

    return {
      transform: `
        translateX(calc(-50% + ${x}px))
        translateY(${y}px)
        scale(${scale})
        rotate(${rotate}deg)
        rotateX(var(--rx, 0deg))
        rotateY(var(--ry, 0deg))
      `,
      zIndex: 100 - Math.abs(diff),
      opacity: Math.abs(diff) > 3 ? 0 : 1
    };
  };

  return (
    <div
      className="curved-carousel"
      style={{
        backgroundImage:
          "url(https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/layouts/20260225/MJmFYDVZTM/l1.webp)"
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="cc-overlay" />

      <button className="cc-arrow cc-left" onClick={prev}>❮</button>
      <button className="cc-arrow cc-right" onClick={next}>❯</button>

      <div className="cc-carousel">
        {data.map((item, index) => (
          <div
            key={index}
            className={`cc-card ${index === active ? "active" : ""}`}
            style={getStyle(index)}
            onMouseMove={handleMove}
            onMouseLeave={resetTilt}
          >
            <img src={item.img} alt="" />
          </div>
        ))}
      </div>

      {/* 🔥 INDICATOR */}
      <div className="cc-indicator">
        {data.map((_, i) => (
          <span
            key={i === active ? active : i}
            className={`cc-dot ${i === active ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}