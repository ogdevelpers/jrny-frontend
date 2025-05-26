import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import LandingPage from './pages/LandingPage.tsx';
import Portfolio from './pages/Portfolio.tsx';
import Blogs from './pages/Blogs.tsx';
import AboutUs from './pages/AboutUs.tsx';
import ContactUs from './pages/ContactUs.tsx';
import PortfolioItem from './pages/PortfolioItem.tsx';
import BlogItem from './pages/BlogItem.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
      {
        index:true,Component: LandingPage
      },
      {
        path:"contact-us",
        Component:  ContactUs 
      },
      { 
        path: "portfolio",
        children: [
          { index: true, Component: Portfolio },
          { path: ":portfolioId", Component: PortfolioItem }
        ]
      },
      { 
        path: "blog",
        children: [
          { index: true, Component: Blogs },
          { path: ":blogId", Component: BlogItem }
        ]
      },
      {
        path:"about-us",
        Component:  AboutUs 
      },

    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <ScrollToTop /> */}
    <RouterProvider router={router} />
  </StrictMode>
)
