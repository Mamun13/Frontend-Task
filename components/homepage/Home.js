import React, { useState, useEffect } from "react";
import { Col, Row, Form, FormControl, Spinner } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { MdFavorite } from "react-icons/md";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShelf, setSelectedShelf] = useState("all");
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://gutendex.com/books");
      setData(response.data.results);
      setFilteredData(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterBooks(value, selectedShelf);
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedShelf(value);
    filterBooks(searchTerm, value);
  };

  const filterBooks = (search, shelf) => {
    let filtered = data;

    // Apply search term filter
    if (search) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply bookshelf filter
    if (shelf !== "all") {
      filtered = filtered.filter((book) => book.bookshelves.includes(shelf));
    }

    setFilteredData(filtered);
  };


  const handleClass = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="d-flex">
        <Col lg={4}>
          <Form className="d-flex mb-4">
            <FormControl
              type="search"
              placeholder="Search by title"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form>
        </Col>
        <Col lg={4}>
          <Form.Select
            aria-label="Select by bookshelves"
            onChange={handleSelectChange}
            value={selectedShelf}
          >
            <option value="all">All Bookshelves</option>
            {data
              .flatMap((book) => book.bookshelves)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((shelf, index) => (
                <option key={index} value={shelf}>
                  {shelf}
                </option>
              ))}
          </Form.Select>
        </Col>
      </div>

      {/* Show Loader when fetching data */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {filteredData.map((book, index) => (
            <Col lg={3} key={index} className="mb-3">
              <Card className="card_size position-relative">
                <Card.Img
                  variant="top"
                  src={
                    book.formats["image/jpeg"] ||
                    "https://via.placeholder.com/150x200"
                  }
                  alt={book.title}
                />
                <Card.Body>
                  <Card.Title className="book_title">{book.title}</Card.Title>
                  <Card.Text>
                    {book.authors.map((author) => author.name).join(", ") ||
                      "Unknown Author"}
                  </Card.Text>
                  <Card.Text>ID: {book.id}</Card.Text>
                  <button className="border-0 bg-transparent ">
                    <MdFavorite
                    key={index}
                      className={isActive ? "icon_active" : "icon_inactive"}
                      onClick={handleClass}
                      size={"25px"}
                    />
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Home;
