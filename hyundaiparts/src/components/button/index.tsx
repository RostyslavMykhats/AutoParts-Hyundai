import React, { Children } from 'react'
import s from './button.module.scss'

const ButtonUi = (props:any) => {
    const { children } = props;
  return (
    <>
        <button {...children} className={s.btn}>
        {children}
        </button>
    </>
  )
}

export default ButtonUi