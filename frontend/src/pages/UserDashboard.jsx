import { Outlet } from "react-router-dom";
import UserNav from "./component/UserNav";
import UserFooter from "./component/UserFooter";


const UserDashboard=()=>{


    return (
        <>
            <UserNav/>
            <hr color="blue" size="4" />
            <Outlet/>

            <hr color="blue" size="4" />
            <UserFooter/>
        </>
    )
}
export default UserDashboard;