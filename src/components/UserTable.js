import React, { useState, useEffect } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

//MODAL CUSTOM STYLE
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 500,
  },
};

function UserTable() {
  const [localData, setLocalData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    city: [],
  });
  const [array, setArray] = useState([]);
  const [idx, setIdx] = useState(null);
  //modal
  const [isopen, setIsopen] = useState(false);

  useEffect(() => {
    getLocalData();
  }, [localData]);

  //get data from localStorage
  const getLocalData = () => {
    let localD = JSON.parse(localStorage.getItem("user"));
    setLocalData(localD);
  };

  const cities = ["Mohali", "Chandigarh", "Panchkula"];

  //handleName
  const handleName = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  //handleAge
  const handleAge = (e) => {
    setFormData({ ...formData, age: e.target.value });
  };

  //handleGender
  const handleGender = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  //handleCity
  const handleCity = (e) => {
    if (formData.city.includes(e.target.value)) {
      let index = formData.city.indexOf(e.target.value);
      formData.city.splice(index, 1);
    } else {
      formData.city.push(e.target.value);
    }
  };

  //DELETE
  const deleteData = (id) => {
    setLocalData(localData.splice(id, 1));
    localStorage.setItem("user", JSON.stringify(localData));
  };

  //EDIT
  const handleEdit = (value, index) => {
    setFormData({ ...value });
    setIsopen(true);
    setIdx(index);
    array.splice(0, 1, value);
  };

  //UPDATE
  const handleUpdate = (id) => {
    let data = JSON.parse(localStorage.getItem("user"));
    data.splice(idx, 1, formData);
    localStorage.setItem("user", JSON.stringify(data));
    setIsopen(false);
    // alert("Data successfully Updated");
  };

  return (
    <div>
      <br />
      <h3>USER TABLE</h3>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* map start */}
          {localData.map((value, index) => {
            return (
              <tr>
                <td>{value.name}</td>
                <td>{value.age}</td>
                <td>{value.gender}</td>
                <td>
                  {value.city.map((c) => {
                    return <p>{c}</p>;
                  })}
                </td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(value, index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteData(index)}
                >
                  Delete
                </button>
              </tr>
            );
          })}
          {/* map end */}
        </tbody>
      </table>
      {/* MODAL START */}
      <Modal isOpen={isopen} style={customStyles}>
        <h2 style={{ textAlign: "center" }}>Update</h2>
        {array.map((value, index) => {
          return (
            <div className="form-group" key={index}>
              <form>
                <b>Name: </b>
                <br />
                <input
                  type="text"
                  placeholder="Enter Name"
                  onChange={handleName}
                  defaultValue={value.name}
                />
                <br />
                <br />
                <b>Gender: </b>
                <br />
                <input
                  type="radio"
                  defaultChecked={value.gender === "Male"}
                  value="Male"
                  onChange={handleGender}
                  id="male"
                  name="gender"
                />
                <label htmlFor="male">Male</label>
                <br />
                <input
                  type="radio"
                  defaultChecked={value.gender === "Female"}
                  value="Female"
                  onChange={handleGender}
                  id="female"
                  name="gender"
                />
                <label htmlFor="female">Female</label>
                <br />
                <br />
                <label>
                  <b>Age: </b>
                </label>
                <br />
                <select onChange={handleAge} defaultValue={value.age}>
                  <option selected disabled>
                    Choose Here
                  </option>
                  <option value="10-20">10 - 20</option>
                  <option value="20-30">20 - 30</option>
                  <option value="30-40">30 - 40</option>
                  <option value="40-50">40 - 50</option>
                  <option value="50-60">50 - 60</option>
                  <option value="60-70">60 - 70</option>
                  <option value="70-80">70 - 80</option>
                  <option value="80-90">80 - 90</option>
                  <option value="90-100">90 - 100</option>
                </select>
                <br />
                <br />
                <b>City: </b>

                {cities.map((city, key) => (
                  <div>
                    <span>
                      <label key={key}>{city}:</label>
                      <input
                        type="checkbox"
                        value={city}
                        defaultChecked={value.city.includes(city)}
                        onChange={handleCity}
                      />
                    </span>
                  </div>
                ))}

                <br />
                <button className="btn btn-info" onClick={() => handleUpdate()}>
                  Update
                </button>
              </form>
              <br />
            </div>
          );
        })}
      </Modal>
      {/* MODAL END */}
    </div>
  );
}

export default UserTable;
