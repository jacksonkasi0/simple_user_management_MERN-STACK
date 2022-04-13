import axios from '../../axios';
import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let timerId;
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/user/userData', {
          headers: {
            authorization: localStorage.getItem('loginToken'),
          },
        });
        if (data?.success === true) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
    return () => {
      clearTimeout(timerId);
    }
  }, []);

  console.log(users);

  return (
    <div>
      <h1>Users</h1>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id}>
            <h2>Name: {user.name}</h2>
            <h3>Email: {user.email}</h3>
            <h3>Role: {user.role}</h3>
            <h3>PhoneNo: {user.phoneNo}</h3>
            <h3>Address: {user.address}</h3>
            <br />
          </div>
        ))
      ) : (
        <h1>Restricted User 🤚🛑🤚</h1>
      )}
    </div>
  );
};

export default Users;
