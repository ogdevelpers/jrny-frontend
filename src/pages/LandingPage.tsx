import Carasoul from "../components/Carasoul/Carasoul";
import "./../css/landingpage.css";
import ShowReel from "../components/ShowReel/ShowReel";
import AnimatedPathWithSlab from "../components/LineSvg/LineSvg";
import HorizontalScrollSlider from "../components/HorizontalScroll/HorizontalScroll";
import { PortfolioMiddleList } from "./Portfolio";
import PartnerSlider from "../components/PartnerSlider/PartnerSlider";
import useIsMobile from "../hooks/useIsMobile";
import LineSvgMobile from "../components/LineSvg/LineSvgMobile";
import Footer from "../components/shared/footer/Footer";
import ExpandingVideo from "../components/ExpandingVideo/ExpandingVideo";  


export default function LandingPage() {
  const isMobile = useIsMobile(1010); 
  return (
    <>
      <div className="landing-container">
        <div className="hero-container">
          <div className="landing-text-container">
            <span className="part-of-span">Been a part of 20+ journeys</span>
            <h1 className="landing-title">
              Making Moments <br />
              <span className="landing-page-matter-text">MATTER</span>
            </h1>
          </div>
          <section className="landing-expanding-video"> 
            <ExpandingVideo/>
          </section>


        </div>


        <div className="landing-svg-container">
          <section className="svg-content">
            {isMobile ? (
              <div className="content-svg-mobile">
                <LineSvgMobile/>
              </div>
            ) : (
              <div className="content-svg">
                <AnimatedPathWithSlab />
              </div>
            )}
          </section>

          <div className="about-us-landing">
            <div className="about-us-section  ">
              <div className="about-us-landing-text">
                <h1 className="about-us-landing-title">
                  About <span className="jrny-span">US</span>
                </h1>
                <p className="about-us-landing-paragraph">
                  JRNY Experiential partners with you to create immersive events
                  that engage, inspire, and connect. Together, we craft
                  unforgettable experiences that leave a lasting impact.{" "}
                </p>
              </div>
              <div className="showreel-container">
                <ShowReel />
              </div>
            </div>
          </div>

          <div className="card-container">
            <section className="card-para-div">
              <div className="services-landing-container  ">
                <h1 className="services-landing-title">
                  Services we <span className="jrny-span">Provide</span>
                </h1>
                <p className="services-landing-paragraph">
                  We create immersive and impactful digital experiences, from
                  virtual conferences to interactive brand activations. Our work
                  transforms ideas into unforgettable moments that engage and
                  inspire audiences. Explore our portfolio to see the journeys
                  we’ve crafted.{" "}
                </p>
              </div>

              <div className="cards-section">
                <div className="cards-section-grid-container">

                <div className="profile-card ">
                  <img src="/jrny_example_profile_card.jpg" alt="" />
                  <div className="profile-caption">
                    <div className="heading">John Doe</div>
                    <div className="description">
                      Event Specialist & Designer
                    </div>
                  </div>
                </div>
                <div className="profile-card generic">
                  <img src="jrny_example_profile_card.jpg" alt="" />
                  <div className="profile-caption">
                    <div className="heading">John Doe</div>
                    <div className="description">
                      Event Specialist & Designer
                    </div>
                  </div>
                </div>
                <div className="profile-card generic">
                  <img src="jrny_example_profile_card.jpg" alt="" />
                  <div className="profile-caption">
                    <div className="heading">John Doe</div>
                    <div className="description">
                      Event Specialist & Designer
                    </div>
                  </div>
                </div>
                <div className="profile-card generic">
                  <img src="jrny_example_profile_card.jpg" alt="" />
                  <div className="profile-caption">
                    <div className="heading">John Doe</div>
                    <div className="description">
                      Event Specialist & Designer
                    </div>
                  </div>
                </div>
                                  
                </div>
              </div>
            </section>

            <div className="testimonial-top">
              We have worked closely with over 20 companies, helping them design
              and deliver meaningful experiences.
            </div>

            <div className="partners-slideshow">
              <span className="partnered">Partnered with:</span>
              <PartnerSlider />

              <div className="landing-line">
                <img src="landing_line.png" alt="" />
              </div>
            </div>
          </div>

          <div className="journeys-div">
            <section className="landing-portfolio">
              <div className="landing-portfolio-title-box">
                <h1 className="landing-portfolio-title">
                  Our <span className="jrny-span">Portfolio</span>
                </h1>
                <p className="landing-portfolio-paragraph">
                  We create immersive and impactful digital experiences, from
                  virtual conferences to interactive brand activations. Our work
                  transforms ideas into unforgettable moments that engage and
                  inspire audiences. Explore our portfolio to see the journeys
                  we’ve crafted.{" "}
                </p>
                <div className="line-outlier"></div>
                <div className="line-outlier-mobile"></div>
              </div>

              <div className="portfolio-tiles-landing">
                <PortfolioMiddleList />
                <div className="see-more-container">

                <a href="/portfolio"><button className="see-more">See More</button></a>
                </div>
              </div>
            </section>

            <div className="testimonial-bottom">
              <span className="testimonial-span">We created </span>
              <span className="jrny-span">JRNY</span>{" "}
              <span className="testimonial-span">
                {" "}
                to enhance journeys, ensuring people cherish the moments that
                matter.
              </span>
            </div>

            <div className="carousol-container">
              <div className="carousol-logo">
                <img src="/jrny-testimonial-logo.png" />
                <span className="testimonial-logo-trusted">Trusted by:</span>
              </div>
              <div className="carousol">
                <div className="profile-section"></div>
                <div className="carousol-card-section"></div>
                <Carasoul />
              </div>
            </div>
          </div>
        </div>

        <div className="penultimate-container">
          <RightChoice />
        </div>
          <div className="landing-footer">

        <Footer />
          </div>
      </div>
    </>
  );
}

export const RightChoice = () => {
  return (
    <>
      <div className="right-choice-container">
        <h1 className="right-choice-h1">
          Why <span className="jrny-span">JRNY</span> is the Right Choice
        </h1>
        <p className="right-choice-p">
          Begin creating journeys that leave a lasting impression, ensuring
          every moment is unforgettable.
        </p>

        <div className="features">
          <div className="feature-container addPlus">
            <span className="feature-title">INNOVATION</span>
            <div className="feature-caption">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
          <div className="feature-container addPlus">
            <span className="feature-title">CUSTOMIZATION</span>
            <div className="feature-caption">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
          <div className="feature-container addPlus">
            <span className="feature-title">EXCELLENCE</span>
            <div className="feature-caption">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat
            </div>
          </div>
          <div className="feature-container addPlus">
            <span className="feature-title">GLOBAL REACH </span>
            <div className="feature-caption">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </div>
          </div>
        </div>
        <div className="testimonial-caption"></div>
      </div>
    </>
  );
};
