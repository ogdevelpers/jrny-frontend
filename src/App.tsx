// import { useGSAP } from "@gsap/react";
import "./App.css";
import ChatUs from "./components/ChatUs/ChatUs";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { Logo } from "./components/shared/navbar/Logo";
import { NavBar } from "./components/shared/navbar/Navbar";
import { Outlet } from "react-router";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { useRef } from "react";
// import gsap from "gsap";

gsap.registerPlugin(ScrollSmoother);

export default function App() { 
    
//     // ✅ Initialize ScrollSmoother ONCE globally - no scope needed
// useGSAP(() => { 

//   // Only create ScrollSmoother if it doesn't exist
//   if (!ScrollSmoother.get()) {
//     ScrollSmoother.create({
//       smooth: 1,
//       effects: true,
//       smoothTouch: 0.1,
//     });
//   }

//   // Cleanup function to kill ScrollSmoother when component unmounts
//   return () => {
//     const smoother = ScrollSmoother.get();
//     if (smoother) {
//       smoother.kill();
//     }
//   };
// }, []); // ❌ Remove the scope - ScrollSmoother should be global

  return (
    <>
    <div className="pinMe" id="smooth-wrapper">

      <div className="header">
        <div className="logo-div">
        <Logo />
        </div>
        <div className="navbar-div">
          <NavBar />
        </div>
      </div>

      <div className="container" id="smooth-content">
        <Outlet />
      <ScrollToTop />
      </div>
      <ChatUs/>
      </div>
    </>
  );
} 


 