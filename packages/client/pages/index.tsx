import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Info from './Info'
import Updat from './Updat'
import AddGo from './Cre'

const Get_USERS = gql`
  query {
    findAllUsers {
      name
      userId
      password
      email
    }
  }
`
const deleteMutation = gql`
  mutation($userId: String!) {
    deleteUser(userId: $userId)
  }
`

const Home: React.FC = () => {
  const { loading, data } = useQuery(Get_USERS)

  const [deleteUser] = useMutation(deleteMutation, {
    variables: {userId},
    refetchQueries: [{ query: Get_USERS }],
  })
  const handleDeleteClick=(e)=> {
   
  }


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
                  <td>
                    <Info key={user.userId} userId={user.userId} />{' '}
                  </td>
                  <td>
                    <Updat key={user.userId} userId={user.userId} />{' '}
                  </td>
                  <td data-userId={user.userId} onClick={handleDeleteClick}>delete</td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <AddGo />
    </>
  )
}

export default Home
