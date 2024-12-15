

import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate=useNavigate();

    useEffect(()=>{
      const Uname = window.localStorage.getItem("name");

      if(!Uname)
      {
        navigate("/");
      }
      setUserName(Uname);
    },[])

    return (
      <>
       
        <div className="Home">
          <div id="homeTxt">
            <h1>Wellcome  {userName} ...</h1>
            <br></br>
            <p>TASK MANAGEMENT SYSTEM</p>
          </div>
        </div>
      </>
    );
  };
  export default Home;
  