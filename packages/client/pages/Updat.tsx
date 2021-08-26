import React from 'react'
import Link from 'next/link'

const updat = ({ userId }) => (
  <div>
    <Link href={`/updateuser?userId=${userId}`}>정보수정하기 </Link>
  </div>
)
export default updat;

