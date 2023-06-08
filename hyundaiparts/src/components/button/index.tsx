import React from 'react'
import s from './button.module.scss'

const ButtonUi = (props) => {
  const { children, ...rest } = props;

  return (
    <button className={s.btn} {...rest}>
      {children}
    </button>
  )
}

export default ButtonUi
