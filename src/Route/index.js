import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Container/Home';
import About from '../Container/About';
import Contact from '../Container/Contact';
import Movies from '../Container/Movies';
import Search from '../Container/Search';
import TVSeries from '../Container/TVSeries';
import Details from '../Container/Details';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const RouteComponent = () => {
    return (
        <>
            <Header></Header>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/series" element={<TVSeries />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/details/:movieid/:movietype" element={<Details />} />
                </Routes>
            </Router>
            <Footer></Footer>
        </>
    )
}

export default RouteComponent