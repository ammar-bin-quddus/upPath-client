import { Outlet } from "react-router-dom";
import useRoadmap from "../hooks/useRoadmap";
import Nav from "../shared/Nav";
import Footer from "../shared/Footer";

const MainLayout = () => {
  const { roadmaps } = useRoadmap();

  console.log(roadmaps);
  return (
    <div>
        <div><Nav /></div>
        <div><Outlet /></div>
        <div><Footer /></div>
    </div>
  );
};

export default MainLayout;
