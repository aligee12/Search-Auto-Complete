import React, { useState, useEffect } from "react";
import { PiShowerDuotone } from "react-icons/pi";

const SearchAutoComplete = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useState(); //searchParameters
  const [dropDown, setDropDown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  //event is automatically passed when method is called by a handler like, onChange
  function handleChange(event) {
    const querry = event.target.value.toLowerCase();
    setSearchParam(querry);
    if (querry.length > 1) {
      // check if querry is a part of item -> then add it to a new filtered array
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(querry) > -1)
          : [];
      setFilteredUsers(filteredData);
      setDropDown(true);
    } else setDropDown(false);
  }
  console.log(users);

  console.log(filteredUsers);

  async function fetchUsers() {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      if (data && data.users && data.users.length) {
        setUsers(data.users.map((userItem) => userItem.firstName));
        setLoading(false);
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen text-4xl flex justify-center items-center">
        Loading data! Wait kro
      </div>
    );
  }
  function handleClick(event) {
    setDropDown(false);
    setSearchParam(event.target.innerText);
  }

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <input
        className="border-2 border-black py-2 px-8 text-xl"
        value={searchParam}
        onChange={handleChange}
        type="text"
        name="search-users"
        placeholder="Search User"
      />
      <div className="flex w-72 px-8">
        {dropDown && (
          <ul className="text-left cursor-pointer" onClick={handleClick}>
            {filteredUsers && filteredUsers.length
              ? filteredUsers.map((item, index) => <li key={index}>{item}</li>)
              : null}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchAutoComplete;
