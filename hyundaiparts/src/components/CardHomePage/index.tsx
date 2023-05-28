import React, { Children } from 'react'
import s from "./card.module.scss"
import Image from 'next/image'

const CardHomepage = (props:any) => {
    const {children} = props;
  return (
    <>
        <div className={`d-flex flex-column align-items-center ${s.card}`}>
            {children}
        </div>
    </>
  )
}

export default CardHomepage