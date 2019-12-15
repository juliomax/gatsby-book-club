import React, {
  useContext,
  useEffect,
  useState,
} from "react"
import {
  Button,
  ErrorMessage,
  Form,
  Input,
} from "../components/common"
import FirebaseContext from "../components/Firebase/context"


const Register = () => {

  const { firebase } = useContext(FirebaseContext)

  const [ formValues, setFormValues ] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  })
  const [ errorMessage, setErrorMessage ] = useState("")
  let isMounted = true
  useEffect(() => {
    return () => {
      isMounted = false
    }
  }, [])

  function handleInputChange(e) {
    e.persist()
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setErrorMessage("")
    if (formValues.password === formValues.confirmPassword) {
      firebase.register({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      }).catch(error => {
        if (isMounted) {
          setErrorMessage(error.message)
        }
      })
    } else {
      setErrorMessage("As senhas não coincidem.")
    }
  }

  return (
    <Form onSubmit={ handleSubmit }>
      <Input onChange={ handleInputChange } value={ formValues.username } name="username" placeholder="username" type="text" required minLength={ 3 }/>
      <Input onChange={ handleInputChange } value={ formValues.email } name="email" placeholder="email" type="email" required/>
      <Input onChange={ handleInputChange } value={ formValues.password } name="password" placeholder="password" type="password" required minLength={ 6 }/>
      <Input onChange={ handleInputChange } value={ formValues.confirmPassword } name="confirmPassword" placeholder="confirm password" type="password" required minLength={ 6 }/>
      { !!errorMessage &&
      <ErrorMessage>{ errorMessage }</ErrorMessage>
      }
      <Button onClick={ handleSubmit } block>
        Register
      </Button>
    </Form>
  )
}

export default Register