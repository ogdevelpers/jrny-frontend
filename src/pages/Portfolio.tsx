import { useEffect, useState } from "react";
import "./../css/portfolio.css";
import Footer from "../components/shared/footer/Footer";
import { Link } from "react-router";
import PartnerSlider from "../components/PartnerSlider/PartnerSlider";
import { fetchCollection } from "../api/strapi";
import { extractContentByKey } from "../utils/common.util";


export default function Portfolio() {

  return (
    <>
      <div className="portfolio-container">
        < PortfolioContent />
      </div>
    </>
  );
}

export const PortfolioContent = () => {

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [brandLogos, setBrandLogos] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchCollection('contents'),
      fetchCollection('portfolios'),
      fetchCollection('brand-logos'),
    ])
      .then(([contentData, portfolioData, brandLogoData]) => {
        setContent(contentData.data);
        setPortfolio(portfolioData.data);
        setBrandLogos(brandLogoData.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const ourText = extractContentByKey(content, 'our-portfolio'),
    portfolioText = extractContentByKey(content, 'portfolio');

    if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="portfolio-landing-container">

        <div className="portfolio-top-section">
          <div className="portfolio-our-projects">
            <div className="our-projects-heading">
              <span className="our-projects-span">
                {ourText?.contentTitle} <span className="jrny-span-text">{portfolioText?.contentTitle}</span>
              </span>
            </div>
            <p className="our-projects-p">
              {ourText?.text}
            </p>
          </div>
          <div className="portfolio-partner-show">
            <PartnerSlider brandLogos={brandLogos} />
          </div>
        </div>
        <PortfolioMiddleList portfolio={portfolio}/>
      </div>

      <Footer />
    </>
  )
}

interface PortfolioTileProps {
  key: number,
  videoLink: string,
  thumbnail?: string,
  tileTitle: string
}

const PortfolioTile = ({key, videoLink, thumbnail, tileTitle }: PortfolioTileProps) => {
  if (!thumbnail) {
  }

  return (
    <div className="portfolio-tile-box moveUp">
      <div className="tile-thumbnail">
        <Link to={`/portfolio/${key}`} className='portfolio-link'>
          {/* <img src={thumbnail ?? '/landing-video-card.png'} alt="" /> */}
          <img src={'/landing-video-card.png'} alt="" />
        </Link>
      </div>
      <div className="tile-title">
        {tileTitle}
      </div>
    </div>
  )
}


export const PortfolioMiddleList = ({ portfolio }: any) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 tiles initially

  console.log('portfolio', portfolio)

  return (
    <div className="portfolio-middle-list">
      <div className="portfolio-tile-container">
        {portfolio?.slice(0, visibleCount)?.map((element: any) => (
          <div key={element.id} className="portfolio-tile">
            <PortfolioTile
              key={element.id}
              tileTitle={element.portfolioTitle}
              videoLink={element.portfolioVideo}
              thumbnail={element.portfolioImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};