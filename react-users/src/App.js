
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
import AccountPage from './pages/AccountPage';
import ListData from './pages/ListData';
import { ChakraProvider } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { Api } from './services/Api';
import { saveUserAuthToStore } from './store/reducers/userAuthReducer';

function App() {
  const dispatch = useDispatch()
  const userFromLocalStorage = Api.getValueFromLocalStorage('user')
  if (userFromLocalStorage) {
    let _user = JSON.parse(userFromLocalStorage)
    dispatch(saveUserAuthToStore({ user: _user, loaded: true }))
  }
  return (

    <Router>
      <div className="App"> <ChakraProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users/:id" element={<ListData />}></Route>

          <Route path="/login" element={<LoginPage />} ></Route>
          <Route path="/register" element={<RegisterPage />} ></Route>
          <Route path="/account/:id" element={<AccountPage />}></Route>
          <Route path="*" element={<Error />}></Route>
          {/* <Route path="/admin" element={ifAdmin(<Layout />)}>
            <Route index element={AdminPage} />
            <Route path="*" element={<Error />}></Route>
          </Route> */}


        </Routes>

        <Footer /> </ChakraProvider>
      </div>

    </Router>

  );
}

export default App;
