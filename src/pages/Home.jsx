import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Banner from "../components/Banner/Banner";
import Row from "../components/Rows/VerticalRow";
import MoreLikeThis from "../components/Rows/ExpandedRow";
import ContinueWatching from "../components/Rows/ContinueWatching";
import CurvedCarousel from "../components/Rows/CurvedCarousel";


import {
  trending,
  recent,
  originals,
  moreLikeThis,
  evergreen,
  moreLikeThis1,
  moreLikeThis2,
  blockbuster,
  katha,
  suprise
} from "../components/data/movies";
import Top10 from "../components/Rows/Top10";
import GlassCard from "../components/Rows/GlassCard";




export default function Home() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div
      style={{
        background: "#000",
        color: "white",
        minHeight: "100vh",
        overflowX: "hidden"
      }}
    >
      {/* Sidebar */}
      <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />

      {/* Banner (ONLY ONCE) */}
      <Banner openMenu={openMenu} />

      {/* Content */}
      <div
        style={{
          paddingLeft: openMenu ? "250px" : "90px",
          marginTop: "10px"
        }}
      >
      
       
      
        {/* Row */}
        <Row title="Trending Now" data={trending}/>

         {/* ✅ ADD HERE */}
        <ContinueWatching />

        <Row title="Recently Added" data={recent}/>

        {/* More Like This (NEW) */}
        <div className="section new-section">

        <MoreLikeThis title = "Feel good " data={moreLikeThis1}/>

        {/* ✅ ADD HERE */}
        <CurvedCarousel />


        <Row title="Original Films" data={originals}/>

        <MoreLikeThis title = "More Like this  " data={moreLikeThis2}/>

        <Row title="Blockbuster Hits" data={blockbuster}/>
          {/* ✅ ADD HERE */}
        <Top10 />
        
        <Row title="katha Sudha" data={katha}/>
        
  
          {/* ✅ ADD HERE */}
       <GlassCard title="Popular Movies" />

       <Row title="Suprise Stories" data={suprise}/>
       
        </div>
      
      

      </div>
    </div>
  );
}