import React, { useRef, useEffect, useState } from "react";
import "./VerticalRow.css";
import StarBorderButton from "../StarBorderButton";


function Row({ title, data }) {
  const rowRef = useRef();

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const scroll = (dir) => {
    rowRef.current.scrollBy({
      left: dir === "left" ? -1000 : 1000,
      behavior: "smooth",
    });
  };

  // ✅ SCROLL LOGIC (FIXED ARROWS)
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const checkScroll = () => {
      const scrollLeft = el.scrollLeft;
      const maxScroll = el.scrollWidth - el.clientWidth;

      setShowLeft(scrollLeft > 10);
      setShowRight(scrollLeft < maxScroll - 10);
    };

    checkScroll(); // run once

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // ✅ 3D EFFECT (UNCHANGED)
  useEffect(() => {
    const container = rowRef.current;
    if (!container) return;

    const handleMove = (e) => {
      const card = e.target.closest(".row-card");
      if (!card) return;

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 50;
      const rotateY = (x - centerX) / 50;

      card.style.setProperty("--rx", `${-rotateX}deg`);
      card.style.setProperty("--ry", `${rotateY}deg`);
    };

    const handleLeave = () => {
      const cards = container.querySelectorAll(".row-card");
      cards.forEach((card) => {
        card.style.setProperty("--rx", `0deg`);
        card.style.setProperty("--ry", `0deg`);
      });
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="row-container">
      <h2 className="row-title">{title}</h2>

      {/* LEFT ARROW */}
      {data.length > 7 && showLeft && (
        <button className="row-arrow left" onClick={() => scroll("left")}>
          ❮
        </button>
      )}

      <div className="row-posters" ref={rowRef}>
        {data.map((item, i) => (
          <div className="row-card" key={i}>
            <img src={item.img} alt="" />

            {/* 🔥 GRAY BOX */}
            <div className="card-info">
              <h4>{item.title}</h4>
              <p>
                {item.genre} • {item.duration} • {item.year}
              </p>

              <div className="card-buttons">
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

      {/* RIGHT ARROW */}
      {data.length > 7 && showRight && (
        <button className="row-arrow right" onClick={() => scroll("right")}>
          ❯
        </button>
      )}
    </div>
  );
}

export default Row;