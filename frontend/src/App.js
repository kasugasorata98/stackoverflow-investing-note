import React, { useEffect, useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Header from './Components/Header';
import AskQuestion from './Pages/AskQuestion';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import API from './Network';

const App = () => {
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      API(token)
        .login(null, null, token)
        .then(res => {
          console.log(res);
          setToken(res.token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Router>
      <Header token={token} setToken={setToken} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route exact path="/" element={<Home searchQuery={searchQuery} />} />
        {
          token ?
            <>
              <Route exact path="/askQuestion" element={<AskQuestion />} />
            </>
            :
            <>
              <Route exact path="/login" element={<Login setToken={setToken} />} />
              <Route exact path="/signUp" element={<SignUp />} />
            </>
        }
      </Routes>
    </Router>
  );
};



export default App;
