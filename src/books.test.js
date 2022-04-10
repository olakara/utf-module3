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

  expect(httpGateway.get).toBeCalledWith("sss");

  expect(viewModel[0].name).toBe("Winddd in the willows");
  expect(viewModel.lenght).toBe(5);
});
