import { useState } from "react";
import Contact from "../components/Contact/Contact";
import PartnerShow from "../components/PartnerShow/PartnerShow";
import "./../css/portfolio.css";
import FooterLine from "../components/shared/footer/FooterLine";
import Footer from "../components/shared/footer/Footer";
import { Link } from "react-router";
import PartnerSlider from "../components/PartnerSlider/PartnerSlider";


export default function Portfolio() {

  return (
    <>
      <div className="portfolio-container">
        < PortfolioContent />
      </div>
    </>
  );
}

export const PortfolioContent = ()=>{
  return (
    <>
    <div className="portfolio-landing-container">

<div className="portfolio-top-section">
  <div className="portfolio-our-projects">
    <div className="our-projects-heading">
      <span className="our-projects-span">
        Our <span className="jrny-span-text">Portfolio</span>
      </span>
    </div>
    <p className="our-projects-p">
      We create immersive and impactful digital experiences, from
      virtual conferences to interactive brand activations. Our work
      transforms ideas into unforgettable moments that engage and
      inspire audiences. Explore our portfolio to see the journeys
      we’ve crafted.
    </p>
  </div>
  <div className="portfolio-partner-show">
              <PartnerSlider />
            </div>
  {/* <div className="portfolio-partner-show">
    <PartnerShow />
  </div> */}
</div>
<PortfolioMiddleList />
</div>

 
<Footer/>
    </>
  )
}

interface PortfolioTileProps{
  videoLink:string,
  thumbnail?:string,
  tileTitle: string
}

const PortfolioTile = ({videoLink, thumbnail, tileTitle}:PortfolioTileProps) =>{
  if(!thumbnail){

  }

  return (
    <div className="portfolio-tile-box moveUp">
      <div className="tile-thumbnail">
        <Link to={'/portfolio/:abcd'} className='portfolio-link'>
        <img src={thumbnail ?? '/landing-video-card.png'} alt="" />
        </Link>
      </div>
      <div className="tile-title">
        {tileTitle}
      </div>
    </div>
  )
}


export const PortfolioMiddleList = () => {
  const allTiles = [...Array(20)].map((_, i) => ({
    id: i,
    title: `Project ${i + 1}`,
    videoLink: "http",
    thumbnail: "/portfolio-video-card.png",
  }));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 tiles initially

 

  return (
    <div className="portfolio-middle-list">
      <div className="portfolio-tile-container">
        {allTiles.slice(0, visibleCount).map((tile) => (
          <div key={tile.id} className="portfolio-tile">
            <PortfolioTile
              key={tile.id}
              tileTitle={tile.title}
              videoLink={tile.videoLink}
              thumbnail={tile.thumbnail}
            />
          </div>
        ))}
      </div>

 
    </div>
  );
};