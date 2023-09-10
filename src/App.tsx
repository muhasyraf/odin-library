"use client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import "./App.css";
import React, { useState } from "react";
import BookList from "./BookList";

function App() {
  const name = "Muhammad Asyraf";
  const [books, setBooks] = useState([
    {
      id: 1,
      bookTitle: "Math",
      bookAuthor: name,
      read: true,
    },
    {
      id: 2,
      bookTitle: "Econ",
      bookAuthor: "Greg PhD",
      read: false,
    },
  ]);
  const [id, setId] = useState(3);

  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setbookAuthor] = useState("");
  const [read, setRead] = useState(true);

  const [isUpdate, setUpdate] = useState({
    id: 0,
    status: false,
  });

  const handleRead = () => {
    setRead(!read);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitle(e.target.value);
  };
  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setbookAuthor(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = [...books];
    if (isUpdate.status) {
      for (const val of data) {
        if (val.id === isUpdate.id) {
          val.bookTitle = bookTitle;
          val.bookAuthor = bookAuthor;
          val.read = read;
        }
      }
    } else {
      setId(id + 1);
      data.push({
        id: id,
        bookTitle: bookTitle,
        bookAuthor: bookAuthor,
        read: read,
      });
      console.log(id);
    }

    setUpdate({
      id: 0,
      status: false,
    });
    setBooks(data);
    setBookTitle("");
    setbookAuthor("");
  };

  function handleUpdate(id: number) {
    const data = [...books];
    const foundData = data.find((book) => book.id === id);
    if (foundData) {
      setBookTitle(foundData.bookTitle);
      setbookAuthor(foundData.bookAuthor);
      setRead(foundData.read);
      console.log(id);
    } else {
      console.log("data not found");
      console.log(id);
    }

    setUpdate({
      id: id,
      status: true,
    });
  }

  function handleDelete(id: number) {
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
                value={bookTitle}
                onChange={(e) => {
                  handleTitleChange(e);
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
                value={bookAuthor}
                onChange={(e) => {
                  handleAuthorChange(e);
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
                onChange={() => {
                  handleRead();
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
