import axios from 'axios';

/**
|--------------------------------------------------
  api.js - модуль связывается с api сервера и передает данные в App.js
  getUsersList - принимает данные с сервера
  deleteUser - удаляет данные с сервера
  updateUser - обновляет данные с сервера
  addUser - добавляет новые данные на сервер
|--------------------------------------------------
*/

const getUsersList = (listPage, usersPerPage = 2) => {
  return axios.get(`https://reqres.in/api/users`, {
    params: {
      page: listPage,
      per_page: usersPerPage,
    }
  });
}

const deleteUser = (id) => {
  return axios.delete(`https://reqres.in/api/users/${id}`);
}

const updateUser = (id, firstName, lastName, email) => {
  return axios.put(`https://reqres.in/api/users/${id}`, {
    "email": email,
    "first_name": firstName,
    "last_name": lastName,
  });
}

const addUser = (firstName, lastName, email) => {
  console.log("api.js - addUser");
  return axios.post(`https://reqres.in/api/users`, {
    "email": email,
    "first_name": firstName,
    "last_name": lastName,
  });
}

export { getUsersList, deleteUser, updateUser, addUser };