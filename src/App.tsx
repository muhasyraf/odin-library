"use client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import "./App.css";
import { useState } from "react";
import BookList from "./BookList";
import { uid } from "uid";

function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      bookTitle: "Math",
      bookAuthor: "Dr Heisenberg",
      read: true,
    },
    {
      id: 2,
      bookTitle: "Econ",
      bookAuthor: "Greg PhD",
      read: false,
    },
  ]);
  const [formInput, setFormInput] = useState({
    bookTitle: "",
    bookAuthor: "",
    read: false,
  });

  const [read, setRead] = useState(true);

  const [isUpdate, setUpdate] = useState({
    id: null,
    status: false,
  });

  const handleRead = (e) => {
    setRead(!read);
    // console.log(read);
    formInput.read = read;
  };

  const handleChange = (e) => {
    const data = { ...formInput };
    data[e.target.name] = e.target.value;
    setFormInput(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = [...books];

    if (isUpdate.status) {
      for (const val of data) {
        if (val.id === isUpdate.id) {
          val.bookTitle = formInput.bookTitle;
          val.bookAuthor = formInput.bookAuthor;
          val.read = formInput.read;
          // console.log(formInput.read);
        }
      }
    } else {
      data.push({
        id: uid(),
        bookTitle: formInput.bookTitle,
        bookAuthor: formInput.bookAuthor,
        read: formInput.read,
      });
      // console.log(formInput.read);
    }

    setUpdate({
      id: null,
      status: false,
    });
    setBooks(data);
    setFormInput({ bookTitle: "", bookAuthor: "", read: formInput.read });
  };

  function handleUpdate(id) {
    const data = [...books];
    const foundData = data.find((book) => book.id === id);

    setFormInput({
      bookTitle: foundData.bookTitle,
      bookAuthor: foundData.bookAuthor,
      read: formInput.read,
    });
    setUpdate({
      id: id,
      status: true,
    });
  }

  function handleDelete(id) {
    const data = [...books];
    const filteredData = data.filter((book) => book.id != id);
    setBooks(filteredData);
  }

  return (
    <div className="mt-10 flex flex-col justify-center items-center container mx-auto">
      <h1 className="text-5xl font-bold underline">The Odin Project</h1>
      <h3 className="mt-2 text-3xl">Project: Library</h3>
      <div className="mt-4 grid grid-rows-2 md:grid-cols-3 w-full">
        <div className="md:col-span-1 p-2 flex items-top justify-center">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="flex max-w-md flex-col gap-4"
          >
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-white"
                  htmlFor="bookTitle"
                  value="Book Title"
                />
              </div>
              <TextInput
                id="bookTitle"
                name="bookTitle"
                value={formInput.bookTitle}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
                shadow
                type="text"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-white"
                  htmlFor="bookAuthor"
                  value="Book Author"
                />
              </div>
              <TextInput
                id="bookAuthor"
                name="bookAuthor"
                value={formInput.bookAuthor}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
                shadow
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="read"
                name="read"
                value="true"
                onChange={(e) => {
                  handleRead(e);
                }}
              />
              <Label
                className="flex text-white"
                htmlFor="read"
                value="Check if you have finished reading the book"
              ></Label>
            </div>
            <Button type="submit">Add / Update</Button>
          </form>
        </div>
        <div className="md:col-span-2 w-full p-2 flex sm:justify-center overflow-x-auto">
          <BookList
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            data={books}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
