import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';

export default function useForm(initialValues) {

  const [ values, setValues ] = useState(initialValues);
  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }
  const useStyle = makeStyles(theme => ({
    root: {
      '& .MuiFormControl-root': {
        width:'80%',
        margin:theme.spacing(1)
      }
    },
    title: {
      color: 'blue'
    }
  }))

  return {
    values,
    setValues,
    handleInputChange,
    useStyle
  }
}
