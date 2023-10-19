
import './App.css';
import {
  Routes,
  Route,
  BrowserRouter as Router
} from "react-router-dom";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Error from './pages/Error';
import ListData from './pages/ListData';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users/:id" element={<ListData />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>

        <Footer />
      </div>

    </Router>

  );
}

export default App;
