import React, { useState } from "react";

function UserForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    city: [],
    // DOB: "",
  });

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

  //   //handleDOB
  //   const handleDOB = (e) => {
  //     setFormData({ ...formData, DOB: e.target.value });
  //   };

  //handleSubmit //submit to localStorage
  const handleSubmit = () => {
    let formArray = [];
    let localData = JSON.parse(localStorage.getItem("user"));
    if (localData === null) {
      formArray.push(formData);
      localStorage.setItem("user", JSON.stringify(formArray));
    } else {
      localData.push(formData);
      localStorage.setItem("user", JSON.stringify(localData));
    }
    // alert("Successfully added", props.history.push("/view"));
    props.history.push("/view");
  };

  return (
    <div>
      <br />
      <h3>ADD USER</h3>
      <br />
      <form>
        {/* NAME */}
        <label>
          <b>Name: </b>

          <input type="text" placeholder="Enter Name" onChange={handleName} />
        </label>
        <br />
        <label>
          {/* AGE */}
          <b>Age: </b>

          <select onChange={handleAge}>
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
        </label>
        <br />
        {/* GENDER */}
        <label>
          <b>Gender: </b>
          <input
            type="radio"
            id="male"
            name="gender"
            checked={formData.gender === "Male"}
            value="Male"
            onChange={handleGender}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            checked={formData.gender === "Female"}
            value="Female"
            onChange={handleGender}
          />
          <label htmlFor="female">Female</label>
        </label>
        <br />
        {/* DOB */}
        {/* <label htmlFor="birthday">
          <b>Date of Birth: </b>
        </label>
        <br />
        <input type="date" id="birthday" name="birthday" onChange={handleDOB} />
        <br /> */}
        {/* CITY */}
        <label>
          <b>City: </b>
          <br />

          <label htmlFor="chd">Chandigarh</label>
          <input
            type="checkbox"
            id="chd"
            value="Chandigarh"
            name="city"
            onChange={handleCity}
          />
          <br />
          <label htmlFor="pchk">Panchkula</label>
          <input
            type="checkbox"
            id="pchk"
            value="Panchkula"
            name="city"
            onChange={handleCity}
          />
          <br />
          <label htmlFor="moh">Mohali</label>
          <input
            type="checkbox"
            id="moh"
            value="Mohali"
            name="city"
            onChange={handleCity}
          />
        </label>
        <br />
        <br />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
  );
}

export default UserForm;
