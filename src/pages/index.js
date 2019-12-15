import React from "react"
import {
  graphql,
  Link,
} from "gatsby"
import BookItem from "../components/BookItem"
import styled from "styled-components"

const LinkButton = styled.div`
  text-align: right;
  a {
    padding: 8px;
    background: rebeccapurple;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    
    &:hover {
      background: indigo;
    }
  }
`

const IndexPage = (props) => {
  console.log(props)
  return (
    <section>
      { props.data.allBook.nodes.map(node => (
        <BookItem
          bookTitle={ node.title }
          bookSummary={ node.summary }
          authorName={ node.author.name }
          bookCover={ node.localImage.childImageSharp.fixed }
          key={ node.id }
        >
          <LinkButton>
            <Link to={ `/book/${ node.id }` }>Join Conversation</Link>
          </LinkButton>
        </BookItem>
      )) }
    </section>
  )
}

export const query = graphql`
  {
    allBook {
      nodes {
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
  }
`
export default IndexPage
