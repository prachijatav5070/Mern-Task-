
import {  Outlet } from "react-router-dom";
import TopMenu from "./component/TopMenu";
// import Footer from "./component/Footer";

const Layout=()=>{
    return (
        <>
            <TopMenu/>
            <hr color="blue" size="4"/>
            <Outlet/>
            <hr color="blue" size="4"/>
            {/* <Footer/> */}
        </>
    )
}

export default Layout;