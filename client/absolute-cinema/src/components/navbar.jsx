import { Link } from "react-router-dom";

export default function Navbar () {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Absolute Cinema
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tickets">
                  My ticket
                </Link>
              </li>
            </ul>
            <a className="navbar-text" href="" onClick={() => {localStorage.clear()}}>Logout</a>
          </div>
        </div>
      </nav>
    );
}