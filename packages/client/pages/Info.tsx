import React from 'react'
import Link from 'next/link'

const info= ({ userId }) => (
  <div>
    <Link href={`/userInfo?userId=${userId}`}>회원정보</Link>
  </div>
)
export default info;