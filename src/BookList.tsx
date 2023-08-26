"use client";
import { Table } from "flowbite-react";
import { Badge } from "flowbite-react";

export default function BookList({ data, handleUpdate, handleDelete }) {
  return (
    <Table striped>
      <Table.Head>
        <Table.HeadCell>Title</Table.HeadCell>
        <Table.HeadCell>Author</Table.HeadCell>
        <Table.HeadCell>Progress</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {data.map((book, index) => {
          return (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={index}
            >
              <Table.Cell>{book.bookTitle}</Table.Cell>
              <Table.Cell>{book.bookAuthor}</Table.Cell>
              <Table.Cell>{book.read ? "Finished" : "On Progress"}</Table.Cell>
              <Table.Cell className="flex flex-row gap-1">
                <button
                  type="button"
                  onClick={() => {
                    handleUpdate(book.id);
                  }}
                >
                  <Badge color="warning">Edit</Badge>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(book.id);
                  }}
                >
                  <Badge color="failure">Delete</Badge>
                </button>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
