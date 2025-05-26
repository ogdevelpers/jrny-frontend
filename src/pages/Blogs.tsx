import { Link } from "react-router"; 
import Footer from "../components/shared/footer/Footer";
import MinuteCount from "../components/shared/MinuteCount";
import Tags from "../components/Tags/Tags";
import { BlogItemExample, BlogItemType } from "../constants/blogs";
import "./../css/blog.css";
import useIsMobile from "../hooks/useIsMobile";

interface BlogsProps {
  route?: "base" | "derived";
}

const truncateContent = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};



const BlogItemArray = Array(12).fill(BlogItemExample);

export default function Blogs({ route = "base" }: BlogsProps) {
  return (
    <>
      <div className="blog-container">
        <BlogHero route={route} />
        <Footer />
      </div>
    </>
  );
}

export const BlogHero = ({route='base'}:BlogsProps)=>{
  const isMobile = useIsMobile(); // Adjust the width as per your design requirements
  return (
    <>
        <div className="blog-hero-container">
          <div className="blog-heading">
            <div className={`${route === 'base' ? 'blog-heading-title' : 'blog-heading-title-more'}`}>
              {`${route === "base" ? "" : "More "}`}{" "}
              <span className="jrny-span">Blogs</span>
            </div>

          </div>
          { 
          (isMobile || route==='derived') ? <BlogTileMobileContainer /> : <BlogTileContainer />
 
          }
        </div>
    </>
  )
}

export const BlogTileContainer = ()=>{
  return (
    <>
              <div className="blog-tile-container">
            {BlogItemArray.map((BlogItem: BlogItemType,index) => (
              <>
              <Link to={`/blog/${BlogItem.id}`} className="blog-link" key={BlogItem.id}>
              <BlogTile thumbnail = {BlogItem.thumbnail}
                        title = {BlogItem.title}
                        caption1={BlogItem.caption1}
                        caption2={BlogItem.caption2}
                        content={BlogItem.content}
                        />
              </Link>
              { (index+1 !== BlogItemArray.length) &&
                <img src='/blog-line.svg'/>}
              </>
            ))}
          </div>
    </>
  )
}
 
interface BlogItemProps {
  thumbnail?: string;
  title: string;
  caption1: string;
  caption2: string;
  content:string;
}

export const BlogTile = ({ thumbnail, title, caption1, caption2, content }: BlogItemProps) => {
  return (
    <div className="blog-tile">
      <div className="blog-info">
        <div className="minute-count-in-tile"><MinuteCount textString={content} /></div>

        <div className="blog-tile-title-content-container">

        <div className="blog-tile-heading">{title}</div> 
        <div className="blog-tile-description">{truncateContent(content, 30)}</div>
        </div>
        <div className="tag-container">
        <Tags tagTitle='Virtual Networking'/>
        <Tags tagTitle='Data'/>
        </div>
      </div>
      <div className="blog-image">
        <img src={thumbnail} alt={title} />
      </div>
    </div>
  );
}; 

export const BlogTileMobile = ({ thumbnail, title, caption1, caption2, content }: BlogItemProps) => {
  return (
    <div className="blog-tile-mobile">
        <div className="blog-image-mobile">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="blog-info-mobile">
        

        <div className="blog-tile-heading">{title}</div> 
 
        <div className="tag-container">
        <Tags tagTitle='Virtual Networking'/>
        <Tags tagTitle='Data'/>
        </div>

        <div className="minute-count-in-tile-m"><MinuteCount textString={content} /></div>
      </div>

    </div>
  );
};

export const BlogTileMobileContainer = ()=>{
  return (
    <>
          <div className="blog-tile-container-mobile">
            {BlogItemArray.map((BlogItem: BlogItemType,index) => (
              <div key={index} className='blog-tile-mobile'>
              <Link to={`/blog/${BlogItem.id}`} className="blog-link" key={BlogItem.id}>
              <BlogTileMobile thumbnail = {BlogItem.thumbnail}
                        title = {BlogItem.title}
                        caption1={BlogItem.caption1}
                        caption2={BlogItem.caption2}
                        content={BlogItem.content}
                        />
              </Link> 
              </div>
            ))}
          </div>
    </>
  )
}