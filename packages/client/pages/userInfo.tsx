import React from 'react'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'

const Get_USER = gql`
  query($userId:String!) {
    findOne(userId: $userId) {
      userId
      name
      email
    }
  }
`
const userInfo: React.FC = () => {
  const router = useRouter()
  const { userId } = router.query
  console.log(router.query);
  
  const { error, loading, data } = useQuery(Get_USER, {
    variables: { userId},
  })
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  
    return (
    <table>
      <tr>id:{data.findOne.userId}</tr>
      <tr>name:{data.findOne.name}</tr>
      <tr>eamil:{data.findOne.email}</tr>
    </table>
  );
}
export default userInfo
