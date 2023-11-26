
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
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ListData from './pages/ListData';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/users/:id" element={<ListData />}></Route>

            <Route path="/login" element={<LoginPage />} ></Route>
            <Route path="/register" element={<RegisterPage />} ></Route>
            <Route path="*" element={<Error />}></Route>
            {/* <Route path="/admin" element={ifAdmin(<Layout />)}>
            <Route index element={AdminPage} />
            <Route path="*" element={<Error />}></Route>
          </Route> */}


          </Routes>

          <Footer />
        </div>

      </Router>
    </ChakraProvider>
  );
}

export default App;
