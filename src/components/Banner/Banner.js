import React, { useEffect, useState, useRef } from "react";
import Hls from "hls.js";
import "./Banner.css";
import StarBorderButton from "../StarBorderButton";
const data = [
  {
    banner: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260225/MJhbgbiKcC/h1.jpg",
    card: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260225/MJhbz7cAd6/v1.webp",
    
    titleImg: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260227/MMlOVLYCrQ/t1.webp",
    trailer:"https://etvwin-s3.akamaized.net/6997002ec7036a4420ec5c47/480_libx264_libfdk_aac/media-1/video.m3u8",
    title: "Sri Chidambaram Garu",
    desc: "Sri Chidambaram Garu is the story of a broken young man who hides behind shame and a borrowed name, ..."
  },
  {
    banner: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7hHxyPNQ/h1.jpg",
    card: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7hR3zMpc/v1.webp",
    titleImg: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7hJiyNKC/t1.webp",
    title: "Oh Bhama Ayyo Rama",
    desc: "Ram, a guy with dreams of settling abroad, finds his life flipped when Sathyabhama—a vibrant and unp..."
  },
  {
    banner: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7rGoLxK4/h1.jpg",
    card: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7rIMINHs/v1.webp",
    titleImg: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260227/MMke5GLDs0/t1.webp",
    title: "Mowgli",
    desc: "In the battle between love and lust, a tribal man fights to save his deaf and mute girlfriend from a..."
  },
  {
    banner: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7qdJYUBU/h1.jpg",
    card: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260225/MJ1jOIpmWu/v1.webp",
    titleImg: "https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260227/MMlhySAprk/t1.webp",
    trailer:"https://etvwin-s3.akamaized.net/694125ecc7036a4420ec0f7a/480_libx264_libfdk_aac/media-1/video.m3u8",
    title: "Raju Weds Rambai",
    desc: "Raju Weds Rambai is inspired by a real story of a carefree band drummer whose love for a compounders..."
  },
  {
    banner:"https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7j7XE1xo/h1.jpg",
    card:"https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/Lc7j9ynpQG/v1.webp",
    titleImg:"https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260227/MMljbrEFqi/t1.webp",
    trailer:"https://etvwin-s3.akamaized.net/68da0d4ac7036a270459bf51/480_libx264_libfdk_aac/media-1/video.m3u8",
    title:"Little Hearts",
    desc:"After failing EAMCET, Akhil joins coaching where he meets Khatyayani. Despite her odd rejection, he ...",
  },
  {
    banner:"https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260327/N7FWzoY1Ca/h1.jpg",
    card:"https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260327/N7FXlntOcq/v1.webp",
    titleImg:"https://dxkcfokobeg0u.cloudfront.net/v1/images/banner/videos/20260130/LcGDZ4x2FE/t1.webp",
    title:"",
    desc:"Prepare for an unforgettable and lively entertainment show filled with laughter on this Sri Rama Nav...",
  }
];




export default function Banner({ openMenu }) {
  const [current, setCurrent] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const videoRef = useRef(null);

  // 🔥 IMAGE → VIDEO / NEXT (WITH VISIBILITY CHECK)
  useEffect(() => {
    setPlayVideo(false);

    const timer = setTimeout(() => {
      if (data[current].trailer && isBannerVisible) {
        setPlayVideo(true);
      } else if (!data[current].trailer) {
        setCurrent((prev) => (prev + 1) % data.length);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [current, isBannerVisible]);

  // 🔥 HLS SETUP + MUTE SYNC
  useEffect(() => {
    if (!playVideo || !data[current].trailer) return;

    const video = videoRef.current;
    const url = data[current].trailer;

    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    }

    video.muted = isMuted;
    video.play().catch(() => {});

    return () => {
      if (hls) hls.destroy();
    };
  }, [playVideo, current]);

  // 🔥 SYNC MUTE
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // 🔥 VIDEO END → NEXT
  const handleVideoEnd = () => {
    setCurrent((prev) => (prev + 1) % data.length);
  };

  // 🔥 TAB VISIBILITY CONTROL
  useEffect(() => {
    const handleVisibility = () => {
      const visible = !document.hidden;
      setIsBannerVisible(visible);

      if (videoRef.current) {
        if (!visible) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // 🔥 SCROLL VISIBILITY CONTROL
  useEffect(() => {
    const handleScroll = () => {
      const banner = document.querySelector(".banner");
      if (!banner) return;

      const rect = banner.getBoundingClientRect();

      const visible =
        rect.top >= -100 && rect.bottom <= window.innerHeight + 100;

      setIsBannerVisible(visible);

      if (videoRef.current) {
        if (!visible) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 3D TILT (UNCHANGED)
  useEffect(() => {
    const cards = document.querySelectorAll(".banner .card");

    cards.forEach((card) => {
      let rafId = null;

      const handleMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 60;
        const rotateY = (x - centerX) / 60;

        cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
          const base = card.style.transform.replace(
            /rotateX\(.*?\) rotateY\(.*?\)/,
            ""
          );

          card.style.transform = `
            ${base}
            rotateX(${-rotateX}deg)
            rotateY(${rotateY}deg)
          `;
        });
      };

      const handleLeave = () => {
        const base = card.style.transform.replace(
          /rotateX\(.*?\) rotateY\(.*?\)/,
          ""
        );
        card.style.transform = base;
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.onmousemove = null;
        card.onmouseleave = null;
      });
    };
  }, [current]);

  // 🔥 HOVER ZOOM
  const handleHover = (e, isActive) => {
    const card = e.currentTarget;
    const base = card.style.transform;

    if (isActive) {
      card.style.transform = base + " scale(1.1)";
    } else {
      card.style.transform = base + " scale(1.15)";
      card.style.zIndex = "50";
      card.style.opacity = "0.9";
    }
  };

  const resetHover = (e, baseTransform, baseOpacity, baseZ) => {
    const card = e.currentTarget;
    card.style.transform = baseTransform;
    card.style.opacity = baseOpacity;
    card.style.zIndex = baseZ;
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % data.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <div
      className="banner"
      style={{
        paddingLeft: openMenu ? "250px" : "100px",
        transition: "0.3s",
      }}
    >

        {/* 🔥 ETV LOGO */}
      <div className="app-header">
        <img src="/etv-logo.svg" alt="ETV Win" className="app-logo" />
      </div>

      {/* BACKGROUND */}
      <div className="bg">
        <img src={data[current].banner} alt="" />

        {playVideo && data[current].trailer && (
          <video
            ref={videoRef}
            className="bg-video"
            playsInline
            onEnded={handleVideoEnd}
          />
        )}
      </div>

      {/* OVERLAY */}
      <div className="overlay" />

      {/* 🔊 MUTE BUTTON */}
      {playVideo && (
        <button
          className="mute-btn"
          onClick={() => {
            const newMute = !isMuted;
            setIsMuted(newMute);

            if (videoRef.current) {
              videoRef.current.muted = newMute;
              videoRef.current.play().catch(() => {});
            }
          }}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      )}

      {/* CONTENT */}
      <div className="content">
        {data[current].titleImg ? (
          <img
            src={data[current].titleImg.trim()}
            alt={data[current].title}
            className="title-img"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <h1>{data[current].title}</h1>
        )}

        <p>{data[current].desc}</p>

       <div className="buttons">
  <StarBorderButton className="play" color="white" speed="3s">
    ▶ Play
  </StarBorderButton>

  <StarBorderButton className="info" color="white" speed="5s">
    + My List
  </StarBorderButton>
</div>
      </div>

      {/* CAROUSEL */}
      <div className="carousel">
        <button className="arrow left" onClick={prev}>❮</button>

        <div className="cards">
          {[-1, 0, 1].map((pos) => {
            const index = (current + pos + data.length) % data.length;
            const item = data[index];

            const baseTransform = `
              translateX(${pos * 160}px)
              scale(${pos === 0 ? 1.15 : 0.8})
            `;

            const baseOpacity = pos === 0 ? 1 : 0.6;
            const baseZ = pos === 0 ? 10 : 1;

            return (
              <div
                key={index}
                className={`card ${pos === 0 ? "active" : ""}`}
                style={{
                  transform: baseTransform,
                  opacity: baseOpacity,
                  zIndex: baseZ,
                }}
                onMouseEnter={(e) => handleHover(e, pos === 0)}
                onMouseLeave={(e) =>
                  resetHover(e, baseTransform, baseOpacity, baseZ)
                }
                onClick={() => setCurrent(index)}
              >
                <img src={item.card} alt="" />
              </div>
            );
          })}
        </div>

        <button className="arrow right" onClick={next}>❯</button>
      </div>
    </div>
  );
}