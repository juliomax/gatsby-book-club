import React, {
  useState,
  useContext,
  useEffect,
} from "react"
import {
  Button,
  Form,
  Input,
} from "../components/common"
import FirebaseContext from "../components/Firebase/context"

const AddAuthor = () => {

  const { firebase } = useContext(FirebaseContext)
  const [ authorName, setAuthorName ] = useState("")
  const [ success, setSuccess ] = useState(false)
  let isMounted = true
  useEffect(() => {
    return () => {
      isMounted = false
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    firebase.createAuthor({ authorName })
      .then(() => {
        if (isMounted) {
          setAuthorName("")
          setSuccess(true)
        }
      })
  }

  return (
    <Form onSubmit={ handleSubmit }>
      <Input placeholder="Author name" onChange={ e => {
        e.persist()
        setSuccess(false)
        setAuthorName(e.target.value)
      } } value={ authorName }/>
      { !!success &&
      <span>Author created successfully</span>
      }
      <Button type="submit" block>
        Add new author
      </Button>
    </Form>
  )
}


export default AddAuthor