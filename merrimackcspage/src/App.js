import './App.css';
import React from "react";
import { MantineProvider } from "@mantine/core"
import '@mantine/core/styles.css';
import './css/variables.css'


import Navbar from "./components/Navbar";
import Home from './pages/Home'
import Blog from './pages/Blog'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


// Routing Reference: https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />

        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
