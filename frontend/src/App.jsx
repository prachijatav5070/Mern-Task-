import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Insert from "./pages/Insert";
import Display from "./pages/Display";
import Delete from "./pages/Delete";
import Edit from "./pages/EditPage";
import Dashboard from "./Dashboard";
import CreateUser from "./pages/UserCreate";
import DisplayCreateuser from "./pages/DisplayCreate";
// import UserTask from "./pages/UserTask";
// import UserTaskStatus from "./pages/UserTaskStatus";
// import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Registration />} />
          <Route path="registration" element={<Registration />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="createuser" element={<CreateUser/>}/>
          <Route path="displaycreateuser" element={<DisplayCreateuser/>}/>
          <Route path="insert" element={<Insert />} />
          <Route path="display" element={<Display />} />
          <Route path="delete" element={<Delete/>}/>
          <Route path="edit/:id" element={<Edit />} />
          {/* <Route path="taskStatus" element={<UserTaskStatus/>}/>
          <Route path="userTask" element={<UserTask/>}/>
          <Route path="UserDashboard" element={<UserDashboard/>}/> */}
        </Route>       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
