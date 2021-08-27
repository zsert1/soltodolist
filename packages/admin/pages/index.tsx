import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

const Get_USERS = gql`
  query {
    findAllUsers {
      name
      userId
      password
      email
    }
  }
`;
const deleteMutation = gql`
  mutation($userId: String!) {
    deleteUser(userId: $userId)
  }
`;

const Home: React.FC = () => {
  const { loading, data } = useQuery(Get_USERS);

  const handleDeleteClick = e => {};

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>USERID</td>
            <td>NAME</td>
            <th>password</th>
            <th>EMAIL</th>
          </tr>
          {!loading &&
            data?.findAllUsers &&
            data.findAllUsers.map(user => {
              return (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.name}</td>
                  <td>{user.password}</td>
                  <td>{user.email}</td>

                  <td data-userId={user.userId} onClick={handleDeleteClick}>
                    delete
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Home;
