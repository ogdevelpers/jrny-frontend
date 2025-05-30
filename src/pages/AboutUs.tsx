import { Link } from 'react-router';
import './../css/about.css';
import ShowReel from '../components/ShowReel/ShowReel';
import Footer from '../components/shared/footer/Footer';
import useIsMobile from '../hooks/useIsMobile';
import TagSlider from '../components/TagSlider/TagSlider';
import Button from '../components/Button/Button';
import { useEffect, useState } from 'react';
import { fetchCollection } from '../api/strapi';
import { extractContentByKey } from '../utils/common.util';

export default function AboutUs() {
  const [loading, setLoading] = useState(true);
    const [content, setContent] = useState([]);
    const [tag, setTag] = useState([]);
    const [team, setTeam] = useState([]);

    useEffect(() => {
        Promise.all([
          fetchCollection('contents'),
          fetchCollection('tags'),
          fetchCollection('teams')
        ])
          .then(([contentData, tagData, teamData]) => {
            setContent(contentData.data);
            setTag(tagData.data);
            setTeam(teamData.data);
          })
          .catch(err => {
            console.error('Error fetching data:', err);
          })
          .finally(() => setLoading(false));
      }, []);

      const aboutText = extractContentByKey(content, 'about-us'),
      usText = extractContentByKey(content, 'us');

  const isMobile = useIsMobile(1000);


  const AboutUsMottoArray = [
  {
    title: extractContentByKey(content, 'mission')?.contentTitle,
    description: extractContentByKey(content, 'mission')?.text
  },
  {
    title: extractContentByKey(content, 'vision')?.contentTitle,
    description: extractContentByKey(content, 'vision')?.text
  },
  {
    title: extractContentByKey(content, 'impact')?.contentTitle,
    description: extractContentByKey(content, 'impact')?.text
  }
]

if (loading) return <p>Loading...</p>;

  return (
    <div className="about-us-container">
      <div className="about-landing-container">
        {
          !isMobile &&
          <div className="about-show-reel">
            <ShowReel />
          </div>}
        <div className="about-landing-content">
          <div className="about-landing-header">
            {aboutText?.contentTitle} <span className='jrny-span'>{usText?.contentTitle}</span>
          </div>
          {
            !isMobile && (

              <div className="about-landing-buttons">
                <Button classList={""}>
                  <Link to='/contact-us'>Contact Us</Link>
                </Button>
              </div>
            )
          }
          <div className="about-landing-description">
            {aboutText?.text}
          </div>
        </div>
      </div>

      <div className="about-tag-container">
        <TagSlider tag={tag}/>
      </div>

                {isMobile && (
            <div className="about-landing-buttons-mobile">
              <Button classList={""}>
                <Link to='/contact-us'>Contact Us</Link>
              </Button>
              <Button classList={"about-portfolio-btn-mobile"}>
                <Link to='/portfolio'>Portfolio</Link>
              </Button>
            </div>
          )}


      
      <div className="about-main-container">
        <div className="about-motto">
          {
            AboutUsMottoArray.map(Motto =>
              <div className="about-motto-box">
                <div className="motto-title">{Motto.title}</div>
                <div className="motto-description">{Motto.description}</div>
              </div>
            )
          }
        </div>

        <div className="about-main-tag">
          <p className="about-main-description">
            <span className="jrny-span">{extractContentByKey(content, 'our-team')?.contentTitle} </span>{extractContentByKey(content, 'our-team-description')?.contentTitle}
          </p>
        </div>

        <div className="about-people-tile-container">
          {team?.map((person: any, index) => (
            <div key={index} className="person-tile">
              <img
                src={person.userImage}
                alt={person.name}
                className="person-image"
              />
              <div className="person-info">
                <div className="person-credentails">
                  <div className="person-name">{person.name}</div>
                  <div className="person-designation">{person.jobTitle}</div>
                </div>
                <div className="social-links-favicon">
                  <a href={person?.personSocials?.linkedIn}><img src="/favicon/linkedin.svg" alt="" /></a>
                  {/* <a href={person.personSocials.instagram}><img src="/favicon/instagram.svg" alt="" /></a>
                <a href={person.personSocials.facebook}><img src="/favicon/facebook.svg" alt="" /></a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="about-footer">
        <Footer />
      </div>
    </div>
  )
}
