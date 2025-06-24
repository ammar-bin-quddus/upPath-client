import { Outlet } from "react-router-dom";
import Nav from "../shared/Nav";
import Footer from "../shared/Footer";

const MainLayout = () => {
  
  return (
    <div>
        <div className="sticky top-0 left-0 z-40"><Nav /></div>
        <div><Outlet /></div>
        <div><Footer /></div>
    </div>
  );
};

export default MainLayout;
