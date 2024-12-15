import { useState, useEffect } from "react";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Delete = () => {
  const [mydata, setmydata] = useState([]);
  const navigate = useNavigate();

  const loadData = () => {
    let api = "http://localhost:8001/users/taskdatadisplay";
    axios.get(api).then((res) => {
      setmydata(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Delete data
  const myDel = (id) => {
    let api = "http://localhost:8001/users/deleteRecord";
    axios.post(api, { myid: id }).then((res) => {
      console.log(res.data);
      alert("Data Deleted");
      loadData(); // Reload data after delete
    });
  };

  // Edit Data
  const myEdit = (id) => {
    // Navigate to the edit page with the provided id
    navigate(`/dashboard/edit/${id}`);
  };

  const ans = mydata.map((key) => {
    return (
      <tr key={key._id}>
        <td> {key.title} </td>
        <td> {key.description} </td>
        <td> {key.dueDate} </td>
        <td>{key.status}</td>
        <td className={`priority ${key.priority.toLowerCase()}`}> {key.priority} </td>
        <td>
          <p
            onClick={() => {
              myDel(key._id);
            }}
          >
            <RiDeleteBin5Line
              style={{ cursor: "pointer" }}
              color="red"
              size="25px"
            />
          </p>
        </td>
        <td>
          <p
            onClick={() => {
              myEdit(key._id);
            }}
          >
            <BiEdit style={{ cursor: "pointer" }} color="purple" size="25px" />
          </p>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="displayPage">
        <div className="formDisplayData">
          <table>
            <thead>
              <tr>
                <th>TASK NAME</th>
                <th> DESCRIPTION </th>
                <th>DUE DATE </th>
                <th>STATUS</th>
                <th>PRIORITY </th>
                <th>Delete Record</th>
                <th>Update Record</th>
              </tr>
            </thead>
            <tbody>{ans}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Delete;
