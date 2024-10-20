

import React, { useState, useEffect } from "react";
import { Col, Row, Form, FormControl, Spinner, Pagination } from "react-bootstrap";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { MdFavorite } from "react-icons/md";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShelf, setSelectedShelf] = useState("all");
  const [loading, setLoading] = useState(false);
  const [activeIcons, setActiveIcons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items per page

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

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredData(data.slice(startIndex, endIndex));
  }, [data, currentPage, itemsPerPage]);

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

    // Apply search filter
    if (search) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply shelf filter
    if (shelf !== "all") {
      filtered = filtered.filter((book) => book.bookshelves.includes(shelf));
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClass = (index) => {
    const newActiveIcons = [...activeIcons];
    newActiveIcons[index] = !newActiveIcons[index];
    setActiveIcons(newActiveIcons);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="d-flex">
        <Col lg={4} md={4} sm={6}>
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
        <Col lg={4} md={4} sm={6}>
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
        <>
          <Row>
            {filteredData.map((book, index) => (
              <Col lg={3} md={3} sm={6} key={index} className="mb-3">
                <Card className="card_size position-relative">
                  <Card.Img
                    variant="top"
                    src={
                      book.formats["image/jpeg"] ||
                      "https://via.placeholder.com/150x200"
                    }
                    alt={book.title}
                    className="book_img"
                  />
                  <Card.Body>
                    <Card.Title className="book_title">{book.title}</Card.Title>
                    <Card.Text className="mb-0">
                      {book.authors.map((author) => author.name).join(", ") ||
                        "Unknown Author"}
                    </Card.Text>
                    <Card.Text>ID: {book.id}</Card.Text>

                    <button
                      className="border-0 bg-transparent"
                      onClick={() => handleClass(index)}
                    >
                      <MdFavorite
                        className={
                          activeIcons[index] ? "icon_active" : "icon_inactive"
                        }
                        size={"25px"}
                      />
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <Pagination className="justify-content-center mt-4">
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </>
      )}
    </>
  );
};

export default Home;

