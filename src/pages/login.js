import React, {
  useContext,
  useEffect,
  useState,
} from "react"
import { FirebaseContext } from "../components/Firebase"
import {
  Button,
  ErrorMessage,
  Form,
  Input,
} from "../components/common"

const Login = () => {
  const [ formValues, setFormValues ] = useState({
    email: "",
    password: "",
  })

  const [ errorMessage, setErrorMessage ] = useState("")
  let isMounted = true
  useEffect(() => {
    return () => {
      isMounted = false
    }
  }, [])

  const { firebase } = useContext(FirebaseContext)

  function handleInputChanges(e) {
    e.persist()
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setErrorMessage("")

    firebase.login({
      email: formValues.email,
      password: formValues.password,
    }).catch(error => {
      if (isMounted) {
        setErrorMessage(error.message)
      }
    })
  }

  return (
    <section>
      <Form onSubmit={ handleSubmit }>
        <Input required name="email" type="email" placeholder="email" value={ formValues.email } onChange={ handleInputChanges }/>
        <Input required name="password" type="password" placeholder="password" value={ formValues.password } onChange={ handleInputChanges }/>
        { !!errorMessage &&
        <ErrorMessage>{ errorMessage }</ErrorMessage>
        }
        <Button type="submit" block>
          Login
        </Button>
      </Form>
    </section>
  )
}

export default Login
