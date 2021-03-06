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
        width:'60%',
        margin:theme.spacing(1),
        display:'flex'
      }
    },
    paperRoot: {
      minHeight: '100vh',
    },
    paperContent: {
      margin: theme.spacing(4),
      padding: theme.spacing(2)
    },
    navbar: {
      margin:theme.spacing(0)
    },
    title: {
      margin:theme.spacing(1)
    },
    textFieldForm: {
      margin:theme.spacing(1)
    },
    extraItemsForm: {
      margin:theme.spacing(2)
    },
    links: {
      margin:theme.spacing(1)
    },
    facebookButton: {
      margin: theme.spacing(2),
    }
  }))

  return {
    values,
    setValues,
    handleInputChange,
    useStyle
  }
}
