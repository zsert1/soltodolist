import gql from 'graphql-tag'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from '@apollo/client'
import Gohome from './gohome'

export const createmutation = gql`
  mutation($createUser: CreateDto!) {
    createUser(createUser: $createUser) {
      name
      email
      password
    }
  }
`
const addUser = () => {
  const [Inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = Inputs

  const hanleonChange = e => {
    const { value, name } = e.target
    setInputs({
      ...Inputs,
      [name]: value,
    })
  }

  const onReset = () => {
    setInputs({
      name: '',
      email: '',
      password: '',
    })
  }

  const [addUsers] = useMutation(createmutation)

  return (
    <>
    <form
      onSubmit={e => {
        e.preventDefault()
        addUsers({ variables: { createUser: Inputs } })
        Inputs.name = ''
        Inputs.email = ''
        Inputs.password = ''
      }}
    >
      <div>
        <input
          name="name"
          placeholder="이름"
          onChange={hanleonChange}
          value={name}
        />
        <input
          name="email"
          placeholder="이메일"
          onChange={hanleonChange}
          value={email}
        />
        <input
          name="password"
          placeholder="password"
          onChange={hanleonChange}
          value={password}
        />
        <button type="submit">생성완료</button>
        <button onClick={onReset}>초기화</button>
      </div>
    </form>
    <Gohome/>
    </>
  )
}

export default addUser
