import Navbar from "./Navbar";
import Footer from "./Footer";
import Background from "./Background";
import SocialSidebar from "./SocialSidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div style={{ position: "relative" }}>
      {/* Constant Background */}
      <Background />

      {/* Navbar stays on top of background */}
      <Navbar style={{ position: "relative", zIndex: 10 }} />

      {/* Social Sidebar */}
      <SocialSidebar />

      {/* Page content will render here */}
      <div style={{ minHeight: "80vh", position: "relative", zIndex: 5 }}>
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}


export default Layout;