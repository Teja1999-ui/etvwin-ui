import { FaHome, FaFilm, FaTv, FaSearch, FaUser, FaList } from "react-icons/fa";
import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar({ openMenu, setOpenMenu }) {
  const [active, setActive] = useState("home");

  const menuItems = [
    { id: "home", icon: <FaHome />, label: "Home" },
    { id: "tv", icon: <FaTv />, label: "TV Shows" },
    { id: "movies", icon: <FaFilm />, label: "Movies" },
    { id: "mylist", icon: <FaList />, label: "My List" }
  ];

  // 🔥 MAIN FIX: separate center logic
  const centerId =
    active === "search" || active === "login" ? "home" : active;

  const selectedItem =
    menuItems.find((item) => item.id === centerId) || menuItems[0];

  const Item = ({ id, icon, label }) => (
    <div
      onClick={() => setActive(id)} // ✅ keep raw click
      className={`menu-item ${active === id ? "active" : ""}`}
      style={menuItem}
    >
      {icon}
      {openMenu && <span>{label}</span>}
    </div>
  );

  return (
    <div
      onMouseEnter={() => setOpenMenu(true)}
      onMouseLeave={() => setOpenMenu(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: openMenu ? "200px" : "70px",
        background: "rgb(0, 0, 0)",
        transition: "0.1s",
        display: "flex",
        flexDirection: "column",
        zIndex: 30
      }}
    >

      {/* 🔒 CLOSED MENU */}
      {!openMenu && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "35px"
          }}
        >
          <Item id="search" icon={<FaSearch />} label="Search" />

          {/* 🔥 ALWAYS SAFE CENTER */}
          <Item
            id={selectedItem.id}
            icon={selectedItem.icon}
            label={selectedItem.label}
          />

          <Item id="login" icon={<FaUser />} label="Login" />
        </div>
      )}

      {/* 📂 OPEN MENU */}
      {openMenu && (
        <>
          <div className="menu-top" style={{ padding: "60px 20px 10px" }}>
            <Item id="search" icon={<FaSearch />} label="Search" />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "29px",
              flex: 1,
              justifyContent: "center"
            }}
          >
            {menuItems.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </div>

          <div className="menu-bottom" style={{ padding: "40px 20px 60px" }}>
            <Item id="login" icon={<FaUser />} label="Login" />
          </div>
        </>
      )}
    </div>
  );
}

/* KEEP YOUR STYLE */
const menuItem = {
  display: "flex",
  alignItems: "center",
  gap: "19px",
  cursor: "pointer",
  padding: "10px 15px",
  position: "relative"
};