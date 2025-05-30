
import '../css/portfolio-item.css';
import { useParams } from 'react-router'; 
import {   PortfolioMiddleList } from './Portfolio';
import Footer from '../components/shared/footer/Footer';
import  ShareOn  from '../components/ShareOn/ShareOn';
import { useEffect, useState } from 'react';
import { fetchCollection } from '../api/strapi';

export default function PortfolioItem() {
    const [loading, setLoading] = useState(true);
    const [portfolio, setPortfolio] = useState([]);
    const { portfolioId } = useParams();

    useEffect(() => {
        Promise.all([
          fetchCollection('portfolios'),
        ])
          .then(([portfolioData]) => {
            setPortfolio(portfolioData.data);
          })
          .catch(err => {
            console.error('Error fetching data:', err);
          })
          .finally(() => setLoading(false));
      }, []);

      const projectData = portfolio?.find((item: any) => item.id === portfolioId);

      console.log('portfolioId', projectData);

      if (loading) return <p>Loading...</p>;
  
  return (
    <>
      <div className="portfolio-item-container">
        <div className="portfolio-item-hero-container">
            <PortfolioItemContent id={portfolioId ?? ''} />
        </div>

        <div className="portfolio-item-middle-list">
            <span className="might-like">Project <span className="jrny-span"> you might Like!  </span></span>
        <PortfolioMiddleList />
        </div>
        <div className="portfolio-item-footer">
      <Footer/>
        </div>
    </div>   
    </>
 
  );
}

interface PortfolioItemProps {
    id:string;
    videoLink?: string;
}

const PortfolioItemContent = ({id}:PortfolioItemProps) =>{ 
    return (
        <div className="project-box">
            <div className="project-header">
            <PortfolioItemHeader/>
                <div className="project-name">
                    Project <span className='jrny-span'>Name</span>
                </div>
                <div className="project-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>

            </div>
            { (id!==undefined) && 
                <div className="project-video-container">
                {/* <video src=""></video> */}
                <img style={{width: "100%"}} src='/video.png' />
            </div>}

            <div className="project-second-box">
                <div className="project-second-header">
                    More about the <span className='jrny-span'>Project</span>
                </div>
                <div className="project-second-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
            </div>

            {/* <div>
                
                <img src="/cards.png" />
                <img src="/cards.png" />
                <img src="/cards.png" />
                
               
                <img src="/cards.png" />
                <img src="/cards.png" />
                <img src="/cards.png" />
                
            </div> */}

        </div>
    )
}

const PortfolioItemHeader = () =>{
    return (
        <div className="portfolio-item-header-container">
            <div className="item-date-company">
                <span className="item-date">
                    22nd March 2025
                </span>
                <span className="item-company">
                    JRNY
                </span>
            </div>
            <div className="share-on">
                <ShareOn/>
            </div>
        </div>
    )
}