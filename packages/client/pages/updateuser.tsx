import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Gohome from './gohome'

const Get_USER = gql`
  query($userId: String!) {
    findOne(userId: $userId) {
      userId
      name
      email
      password
    }
  }
`

const updatemutation = gql`
  mutation($userId: String!, $updateUser: UpdateDto!) {
    updateUser(userId: $userId, updateUser: $updateUser) 
     
    
  }
`
const updateUser = () => {
  const router = useRouter()
  const { userId } = router.query
  console.log('router.query userId', userId)
  const { loading, data } = useQuery(Get_USER, {
    variables: { userId },
  })
  const [Inputs, setInputs] = useState({
    name: data?.findOne?.name,
    email: data?.findOne?.email,
    password: data?.findOne?.password,
  })
  
  
   useEffect(()=>{
    if (data !== data) {
      setInputs(data);
    }
   },[data])
   console.log('data바뀐다')
  

  const [updateUsers] = useMutation(updatemutation)

  if (!userId) {
    return <p>userid not found</p>
  }
  if (loading) return <p>Loading...</p>
  if (!data?.findOne) return <p>findOne load failed</p>

  const { name, email, password } = Inputs

  const handleChange = e => {
    const { name, value } = e.target
    setInputs({
      ...Inputs,
      [name]: value,
    })
  }

  return (
    <>
    <form
      onSubmit={e => {
        e.preventDefault()
        updateUsers({ variables: { userId, updateUser: Inputs } })
        Inputs.name = ''
        Inputs.email = ''
        Inputs.password = ''
      }}
    >
      <input
        name="name"
        placeholder={data.findOne.name}
        onChange={handleChange}
        value={name}
      />
      <input
        name="email"
        placeholder={data.findOne.email}
        onChange={handleChange}
        value={email}
      />
      <input
        name="password"
        placeholder={data.findOne.password}
        onChange={handleChange}
        value={password}
      />
     
      <button type="submit" >수정완료</button>
    </form>
   <Gohome/>
   </>
  );
}
export default updateUser
