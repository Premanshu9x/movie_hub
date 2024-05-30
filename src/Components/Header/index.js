import React from 'react'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid ">
        <a className="navbar-brand" href="/">LOGO</a>
        <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon bg-white"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link"  href="/">HOME</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/movies">MOVIES</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/series">TV SERIES</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/search">SEARCH</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header