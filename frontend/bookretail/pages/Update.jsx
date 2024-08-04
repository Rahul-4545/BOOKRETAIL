import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: "",
    cover: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:887/books/${bookId}`);
        setBook(res.data);
      } catch (err) {
        console.log("Error occurred while fetching the book:", err);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending update request with book data:", book);
      const response = await axios.put(`http://localhost:887/books/${bookId}`, book);
      console.log("Update response:", response);
      navigate("/");
    } catch (err) {
      console.log("Error occurred while updating the book:", err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        value={book.title}
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        value={book.desc}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        value={book.price}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        value={book.cover}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && <p>Something went wrong!</p>}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;
