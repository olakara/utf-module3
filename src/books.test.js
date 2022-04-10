import BooksPresenter from "./Books/BooksPresenter";
import httpGateway from "./Shared/HttpGateway";

it("should hit backend API & load 3 view model books when books loaded from backend", async () => {
  httpGateway.get = jest.fn().mockImplementation(() => {
    return {
      success: true,
      result: [
        {
          bookId: 140431,
          name: "Wind in the willows",
          ownerId: "olakara@gmail.com",
          author: "Kenneth Graeme"
        },
        {
          bookId: 140441,
          name: "I, Robot",
          ownerId: "olakara@gmail.com",
          author: "Isaac Asimov"
        },
        {
          bookId: 140451,
          name: "The Hobbit",
          ownerId: "olakara@gmail.com",
          author: "Jrr Tolkein"
        }
      ]
    };
  });

  let viewModel = null;
  let booksPresenter = new BooksPresenter();
  await booksPresenter.load((generatedViewModel) => {
    viewModel = generatedViewModel;
  });

  expect(httpGateway.get).toBeCalledWith(
    "https://api.logicroom.co/api/olakara@gmail.com/books"
  );

  expect(viewModel[0].name).toBe("Wind in the willows");
  expect(viewModel.length).toBe(3);
});

it("should insert a book to the backend when the API is supplied with a bookPm object", async () => {
  httpGateway.post = jest.fn().mockImplementation(() => {
    return {
      success: true,
      result: "book created"
    };
  });

  let bookDto = {
    name: "A new Book",
    author: "ARO"
  };

  let booksPresenter = new BooksPresenter();
  await booksPresenter.addBook(bookDto);

  expect(httpGateway.post).toBeCalledWith(
    "https://api.logicroom.co/api/olakara@gmail.com/books"
  );
});
