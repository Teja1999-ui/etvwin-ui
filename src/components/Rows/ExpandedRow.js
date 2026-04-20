import React, { useRef, useEffect, useState } from "react";
import "./ExpandedRow.css";
import StarBorderButton from "../StarBorderButton"; // adjust path



function MoreLikeThis({ title = "More Like This", data = [] }) {

  const rowRef = useRef();
  const lastX = useRef(0);

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

  // 3D tilt
  useEffect(() => {
    const container = rowRef.current;
    if (!container) return;

    const handleMove = (e) => {
      const card = e.target.closest(".mlt-card");
      if (!card) return;

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 60;
      const rotateY = (x - centerX) / 60;

      card.style.setProperty("--rx", `${-rotateX}deg`);
      card.style.setProperty("--ry", `${rotateY}deg`);
    };

    const handleLeave = (e) => {
      const card = container.contains(e.target)
        ? e.target.closest(".mlt-card")
        : null;

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

  // Hover expand
  const handleHover = (e) => {
    const card = e.currentTarget;

    const currentX = e.clientX;
    const direction = currentX > lastX.current ? "right" : "left";
    lastX.current = currentX;

    const allCards = rowRef.current.querySelectorAll(".mlt-card");

    allCards.forEach((c) => {
      c.classList.remove("active", "left", "right");
      c.style.setProperty("--expand-offset", "0px");
    });

    card.classList.add("active", direction);

    const rect = card.getBoundingClientRect();
    const container = rowRef.current.getBoundingClientRect();

    const expandWidth = 390;
    let offset = 0;

    if (direction === "right") {
      if (rect.left + expandWidth > container.right) {
        offset = container.right - (rect.left + expandWidth);
      }
    } else {
      if (rect.left - (expandWidth - 210) < container.left) {
        offset = container.left - rect.left;
      }
    }

    card.style.setProperty("--expand-offset", `${offset}px`);
  };

  const handleLeaveAll = () => {
    const allCards = rowRef.current.querySelectorAll(".mlt-card");
    allCards.forEach((c) => {
      c.classList.remove("active", "left", "right");
      c.style.setProperty("--expand-offset", "0px");
      c.style.setProperty("--rx", "0deg");
      c.style.setProperty("--ry", "0deg");
    });
  };

  return (
    <div className="mlt-container" onMouseLeave={handleLeaveAll}>
      <h2 className="mlt-title">{title}</h2>

      {data?.length > 7 && showLeft && (
        <button className="mlt-arrow left" onClick={() => scroll("left")}>
          ❮
        </button>
      )}

      <div className="mlt-grid" ref={rowRef}>
        {data.map((item, i) => (
          <div
            className="mlt-card"
            key={i}
            onMouseEnter={handleHover}
          >
            {/* IMAGES */}
            <img src={item.vertical} alt="" className="vertical-img" />
            
            <div className="horizontal-wrap">
  <img src={item.horizontal} className="horizontal-img" />
</div>

   {/* 🔥 OVERLAY (SAFE) */}
<div className="mlt-overlay">

  {item.logo && (
    <div className="logo-wrap">
      <img src={item.logo} alt="" className="mlt-logo" />
    </div>
  )}
  {(item.year || item.genre || item.duration || item.rating) && (
 <div className="mlt-meta">

  {item && item.year && <span>  {item.year}</span>}
  {item && item.genre && <span> • {item.genre}</span>}
  {item && item.duration && <span> • {item.duration}</span>}
   {item.rating && (
      <span className="rating-badge"> •{item.rating}</span>
    )}
</div>
              )}

  <div className="mlt-actions">
  <StarBorderButton className="watch-btn" color="white" speed="2s">
    ▶ Play
  </StarBorderButton>

  <StarBorderButton className="add-btn" color="white" speed="2s">
    ＋
  </StarBorderButton>
</div>
            </div>
          </div>
        ))}
      </div>

      {data?.length > 7 && showRight && (
        <button className="mlt-arrow right" onClick={() => scroll("right")}>
          ❯
        </button>
      )}
    </div>
  );
}

export default MoreLikeThis;