import { useCallback } from 'react'
import borroService from '../services/borrowservice'
import bookService from '../services/productService'
import authorService from '../services/authorService'
import userService from '../services/userService'
import { exampleBook, testAuthorBiography } from '../common/exampleData'

const useResetBookList = () => {
  const resetBookList = useCallback(async () => {
    try {
      const booksResponse = await userService.getPublicContent()
      const borrowsResponse = await userService.getAllBorrowList()
      const AuthorsResponse = await authorService.getAllAuthor()

      const books = booksResponse.data
      const borrows = borrowsResponse.data
      const authors = AuthorsResponse.data

      for (const borrow of borrows) {
        await borroService.deleteBorrow(borrow?._id)
      }

      for (const book of books) {
        await bookService.deleteBook(book?._id)
      }

      for (const author of authors) {
        await authorService.deleteAuthor(author?._id)
      }

      const testAuthor = await authorService.addAuthor({
        firstName: 'Test',
        lastName: 'Author',
        biography: testAuthorBiography,
      })

      for (const book of exampleBook) {
        await bookService.addBook({ ...book, author: testAuthor?.data?._id })
      }
    } catch (error) {
      console.error('Failed to reset book list:', error)
    }
  }, [])

  return resetBookList
}

export default useResetBookList
