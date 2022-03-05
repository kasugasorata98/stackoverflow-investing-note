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
import ViewQuestion from './Pages/ViewQuestion';
import Toast from './Components/Toast';


const App = () => {
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');

  // for alert
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
    duration: 3000
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      API(token)
        .login(null, null, token)
        .then(res => {
          console.log(res);
          setToken(res.token);
          setUsername(res.username);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Router>
      <Header token={token} setToken={setToken} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setAlert={setAlert} setUsername={setUsername} />
      <Toast alert={alert} setAlert={setAlert} />
      <Routes>
        <Route exact path="/" element={<Home searchQuery={searchQuery} setAlert={setAlert} username={username} />} />
        <Route exact path="/viewQuestion" element={<ViewQuestion setAlert={setAlert} />} />
        {
          token ?
            <>
              <Route exact path="/askQuestion" element={<AskQuestion setAlert={setAlert} />} />
            </>
            :
            <>
              <Route exact path="/login" element={<Login setToken={setToken} setAlert={setAlert} setUsername={setUsername} />} />
              <Route exact path="/signUp" element={<SignUp setAlert={setAlert} />} />
            </>
        }
      </Routes>
    </Router>
  );
};



export default App;
