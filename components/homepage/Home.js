import React, { useState, useEffect } from "react";
import { Col, Row, Form, FormControl } from "react-bootstrap";
const axios = require("axios");
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("https://gutendex.com/books");
      setData(response.data.results);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((book) =>
        book.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <>
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
      <Row>
        {filteredData.map((book, index) => {
          return (
            <>
              <Col lg={3} key={index}>
                <Card className="mb-3 card_size">
                  <Card.Img
                    variant="top"
                    src={book.formats["image/jpeg"] || ""}
                    alt={book.title}
                  />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{book.author_name}</Card.Text>
                    <Button variant="primary" className="rounded-1">
                      cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </>
          );
        })}
      </Row>
    </>
  );
};

export default Home;
