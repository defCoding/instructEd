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
    paper: {
      margin: theme.spacing(3)
    },
    root: {
      margin:theme.spacing(1)
    },
    navbar: {
      margin:theme.spacing(0)
    },
    title: {
      color: 'secondary',
      margin:theme.spacing(1)
    },
    form: {
      margin:theme.spacing(0.75)
    },
    submit: {
      margin:theme.spacing(1)
    },
    link: {
      color:'secondary',
      margin:theme.spacing(0.5)
    }
  }))

  return {
    values,
    setValues,
    handleInputChange,
    useStyle
  }
}
