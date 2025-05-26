import { Link } from 'react-router';
import './../css/about.css';
import ShowReel from '../components/ShowReel/ShowReel';
import Footer from '../components/shared/footer/Footer';
import useIsMobile from '../hooks/useIsMobile';
import TagSlider from '../components/TagSlider/TagSlider';
import Button from '../components/Button/Button';

const AboutUsMottoArray = [
  {
    title: "MISSION",
    description: "We exist to transform ordinary journeys into extraordinary ones. Our goal is to help businesses create experiences that people don’t just go through but truly remember. From startups to established brands, we partner with companies to craft meaningful moments."
  },
  {
    title: "VISION",
    description: "We strive to redefine digital events by turning ordinary interactions into extraordinary experiences. Through innovation and technology, we create immersive, engaging, and seamless events that connect people in meaningful ways."
  },
  {
    title: "IMPACT",
    description: "From startups to global enterprises, we’ve empowered brands to host unforgettable digital events. By combining creativity, strategy, and cutting-edge solutions, we ensure every event leaves a lasting impression and drives real engagement."
  }
]

const AboutUsPerson = {
  personPicture: "/about-person.png",
  personName: "John Doe",
  personDesignation: "Director, ABC",
  personSocials: {
    linkedIn: "http LinkedIn",
    instagram: "http instagram",
    facebook: "http Facebook"
  }
};

const AboutUsPersonArray = Array(12).fill(AboutUsPerson);


export default function AboutUs() {
  const isMobile = useIsMobile(1000);
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
            About <span className='jrny-span'>US</span>
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
            At JRNY, we believe every experience should be more than just a moment—it should be a memory that lasts. We are passionate about designing journeys that connect, inspire, and leave a lasting impact. Whether it's through seamless user experiences, immersive storytelling, or meaningful interactions, we make sure every step of the journey is unforgettable.
          </div>
        </div>
      </div>

      <div className="about-tag-container">
        <TagSlider />
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
            <span className="jrny-span">Our team </span>is made up of passionate creatives, strategists, and experience designers who are dedicated to making every journey unforgettable.
          </p>
        </div>

        <div className="about-people-tile-container">
          {AboutUsPersonArray.map((person, index) => (
            <div key={index} className="person-tile">
              <img
                src={person.personPicture}
                alt={person.personName}
                className="person-image"
              />
              <div className="person-info">
                <div className="person-credentails">
                  <div className="person-name">{person.personName}</div>
                  <div className="person-designation">{person.personDesignation}</div>
                </div>
                <div className="social-links-favicon">
                  <a href={person.personSocials.linkedIn}><img src="/favicon/linkedin.svg" alt="" /></a>
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
