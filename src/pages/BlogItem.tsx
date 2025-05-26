
import '../css/blog-item.css' 
import { BlogItemExample, BlogItemType } from '../constants/blogs';
import { BlogHero } from './Blogs';
import ShareOn from '../components/ShareOn/ShareOn';
import Footer from '../components/shared/footer/Footer';


const HighlightedSentence = ({ text }:{text:string}) => {
  const words = text.trim().split(' ');
  const lastTwo = words.slice(-2).join(' ');
  const rest = words.slice(0, -2).join(' ');

  return (
    <p className="sentance">
      {rest} <span className="highlight">{lastTwo}</span>
    </p>
  );
};


const Blog: BlogItemType =BlogItemExample; 

export default function BlogItem() { 
  
  return (
    <>
    <div className="blog-item-container">
        <div className="blog-content-box">
          <section className="blog-item-header">
            <div className="blog-content-title">
                <HighlightedSentence text={Blog.title} />
                <div className="blog-item-caption">
              {Blog.caption1}
            </div>
            </div>
            
            <section className="blog-item-header-utils">
              <div className="blog-item-company-minute">
                <div className="blog-item-company-name">2025 - JRNY</div>
                <div className="blog-item-minute"> 5 minute read</div>
              </div>
              <div className="share-on">
                <ShareOn/>
            </div>
            </section>
            <img src="/landing_line.png" alt="" />
            <img src="/top-event.png" alt="" />
            
          </section>
            <div className="">
                {/* {Blog.content} */}
            <p className='text-p'>In the vibrant hub of Mumbai's event scene, Zero Design Studio shines as a beacon of innovation and excellence, standing tall among content-driven event management companies in Mumbai. Renowned for its multidisciplinary approach, Zero Design Studio is a trailblazer in crafting immersive and engaging events that leave a lasting impression on attendees.</p>
            <p className='text-p-1'>Unveiling Zero Design Studio's Multidisciplinary Excellence</p>
            <p className='text-p'>Zero Design Studio's hallmark is its seamless fusion of creativity, technology, and strategic planning, setting it apart as a top-tier event management company in Mumbai. Specializing in a diverse range of services, including events, digital experiences, experiential marketing, exhibitions, MICE, and OOH advertising, the studio offers unparalleled expertise in curating unforgettable experience</p>
            <p className='text-p-1'>Crafting Unforgettable Event</p>
            <p className='text-p'>As a go-to destination for superior event management, Zero Design Studio excels in crafting bespoke experiences tailored to each client's vision. From corporate galas to product launches and themed celebrations, the studio's innovative touch ensures that every event stands out amidst Mumbai's bustling event landscape.</p>
            <p className='text-p-1'>Elevating Brand Visibility with OOH Advertising</p>
            <p className='text-p'>In the competitive realm of advertising, Zero Design Studio goes beyond traditional approaches, leveraging billboard advertising and out-of-home advertising (OOH) to captivate audiences. With expertise in impactful OOH installations and digital billboard campaigns, including cutting-edge techniques like anamorphic advertising, the studio elevates brand promotions to new heights of creativity and engagement.</p>
            <div>
            <img src='/img1.png'/>
            <img style={{float: 'right'}} src='/img2.png'/>
            </div>
            <p className='text-p'>Amidst Mumbai's bustling event scene, Zero Design Studio continues to lead the charge in content-driven event management, setting new standards of excellence with its innovative approach and multidisciplinary expertise. For businesses and brands looking to create unforgettable experiences that resonate with audiences, partnering with Zero Design Studio is more than a strategic move – it's an investment in crafting moments that endure in the memories of attendees for years to come.</p>
            </div>
        </div>
    <div className="blog-item-bottom">

    <BlogHero route='derived'/>
    <Footer/>
    </div>
    </div>
    </>
  )
}
