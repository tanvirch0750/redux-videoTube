import Home from './pages/Home';
import Video from './pages/Video';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos/:id" element={<Video />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
