import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { auth, db } from './firebase';
import { doc, getDocs, collection, deleteDoc, query, writeBatch } from 'firebase/firestore';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import "../bootstrap.min.css";
import NavBar from './navbar';
import { Helmet } from 'react-helmet';

const Profile = () => {
  const [articleHistory, setArticleHistory] = useState([]);
  const { currentUser } = useAuth();
  const [darkMode] = useState(false); // Ensure this state is managed correctly

  useEffect(() => {
    const fetchArticleHistory = async () => {
      try {
        if (currentUser) {
          const q = query(collection(db, 'Users', currentUser.uid, 'articleHistory'));
          const querySnapshot = await getDocs(q);
          const history = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const timestamp = data.timestamp?.toDate
              ? data.timestamp.toDate()
              : new Date(data.timestamp);
            history.push({ ...data, id: doc.id, timestamp });
          });
          setArticleHistory(history);
        } else {
          console.warn('No current user found');
        }
      } catch (error) {
        console.error('Error fetching article history:', error);
      }
    };

    fetchArticleHistory();
  }, [currentUser]);

  const handleDeleteArticleHistory = async (id) => {
    try {
      if (currentUser) {
        const docRef = doc(db, 'Users', currentUser.uid, 'articleHistory', id);
        await deleteDoc(docRef);
        setArticleHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
        toast.success('Article history item deleted successfully!', { position: 'top-center' });
      } else {
        console.warn('No current user found for deletion');
      }
    } catch (error) {
      console.error('Error deleting article history item:', error);
      toast.error('Error deleting article history item', { position: 'bottom-center' });
    }
  };

  const handleClearArticleHistory = async () => {
    try {
      if (currentUser) {
        const batch = writeBatch(db);
        const q = query(collection(db, 'Users', currentUser.uid, 'articleHistory'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });

        await batch.commit();
        setArticleHistory([]);
        toast.success('Article history cleared successfully!', { position: 'top-center' });
      } else {
        console.warn('No current user found for clearing history');
      }
    } catch (error) {
      console.error('Error clearing article history:', error);
      toast.error('Error clearing article history', { position: 'bottom-center' });
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success('Logged out successfully!', { position: 'top-center' });
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out', { position: 'bottom-center' });
    }
  };

  return (
    <>
      <Helmet>
        <title>NewsForYou - My Profile</title> {/* Set the page title */}
      </Helmet>
      <NavBar darkMode={darkMode} />
      <Container className={`mt-5 ${darkMode ? 'dark-mode' : ''}`}>
        <h3 className={`text-${darkMode ? 'light' : 'dark'}`}>Article History</h3>
        {articleHistory.length === 0 ? (
          <div>
            <p className={`text-${darkMode ? 'light' : 'dark'}`}>No article history available.</p>
            <Button variant="primary" onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <>
            <Table striped bordered hover className={darkMode ? 'table-dark' : ''}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articleHistory.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </td>
                    <td>{new Date(item.timestamp).toLocaleString()}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteArticleHistory(item.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Row className="mt-3 justify-content-center">
              <Col xs="auto" className="mx-2">
                <Button variant="warning" onClick={handleClearArticleHistory}>
                  Clear All Article History
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Profile;
