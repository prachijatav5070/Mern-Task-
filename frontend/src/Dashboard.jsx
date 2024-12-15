import { Outlet } from "react-router-dom";
// import Footer from "./component/Footer";
import DashNav from "./component/DashNav";
const Dashboard = () => {
  return (
    <>
      <DashNav />
      <hr color="blue" size="4" />
      <Outlet />
      <hr color="blue" size="4" />
      {/* <Footer /> */}
    </>
  );
};

export default Dashboard;
