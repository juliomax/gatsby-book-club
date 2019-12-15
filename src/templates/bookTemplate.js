import React, { useContext } from "react"
import BookItem from "../components/BookItem"
import { graphql } from "gatsby"
import { BookComments } from "../components/common"
import { FirebaseContext } from "../components/Firebase"

const BookTemplate = (props) => {
  const { firebase } = useContext(FirebaseContext)

  return (
    <section>
      <BookItem
        authorName={ props.data.book.author.name }
        bookSummary={ props.data.book.summary }
        bookTitle={ props.data.book.title }
        bookCover={ props.data.book.localImage.childImageSharp.fixed }
      />
      { !!firebase &&
      <BookComments firebase={ firebase } bookId={ props.data.book.id }/>
      }
    </section>
  )
}

export const query = graphql`
  query BookQuery($bookId: String!){
    book(id: {eq:$bookId}){
      title
      summary
      localImage {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      id
      author {
        name
      }
    }
  }
`

export default BookTemplate