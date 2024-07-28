import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import NavBar from './navbar';
import "../bootstrap.min.css";
import { toast } from 'react-toastify';
import { useAuth } from './AuthProvider';
import { fetchBreakingNews, searchArticles } from '../api/api';
import { Helmet } from 'react-helmet';

function MainPage() {
  const [breakingNews, setBreakingNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getBreakingNews = async () => {
      try {
        const articles = await fetchBreakingNews();
        setBreakingNews(articles);
      } catch (error) {
        console.error('Error fetching breaking news:', error);
      }
    };
    getBreakingNews();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const articles = await searchArticles(searchQuery);
      setSearchResults(articles);
    } catch (error) {
      console.error('Error fetching search results:', error);
      toast.error('Error fetching search results', { position: 'bottom-center' });
    }
  };

  const handleSaveToHistory = async (article) => {
    if (currentUser) {
      const newHistoryItem = {
        title: article.title,
        url: article.url,
        timestamp: new Date().toISOString(),
      };
      const batch = writeBatch(db);
      const docRef = doc(collection(db, 'Users', currentUser.uid, 'articleHistory'));
      batch.set(docRef, newHistoryItem);
      try {
        await batch.commit();
        toast.success('Article added to history!', { position: 'top-center' });
      } catch (error) {
        console.error('Error saving article to history:', error);
        toast.error('Error saving article to history', { position: 'bottom-center' });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>NewsForYou - Search</title> {/* Set the page title */}
      </Helmet>
      <NavBar />
      <Container className="mt-5">
        <h2>Search News</h2>
        <Form onSubmit={handleSearch}>
          <Form.Group controlId="searchQuery">
            <Form.Label>Search for articles</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter search query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">Search</Button>
        </Form>
        <h2 className="mt-5">Search Results</h2>
        <Row className="g-4">
          {searchResults.map((article, index) => (
            <Col key={index} md={3} className="d-flex">
              <Card className="custom-card">
                <Card.Img variant="top" src={article.image_url || 'placeholder.jpg'} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text className="flex-grow-1">{article.description}</Card.Text>
                  <Button 
                    variant="primary" 
                    href={article.url} 
                    target="_blank" 
                    onClick={() => handleSaveToHistory(article)}
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <h2 className="mt-5">Breaking News</h2>
        <Row className="g-4">
          {breakingNews.map((article, index) => (
            <Col key={index} md={3} className="d-flex">
              <Card className="custom-card">
                <Card.Img variant="top" src={article.image_url || 'placeholder.jpg'} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text className="flex-grow-1">{article.description}</Card.Text>
                  <Button 
                    variant="primary" 
                    href={article.url} 
                    target="_blank" 
                    onClick={() => handleSaveToHistory(article)}
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MainPage;
