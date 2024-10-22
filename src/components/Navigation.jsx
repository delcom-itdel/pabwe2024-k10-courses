import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaPlus, FaUser, FaRightFromBracket } from "react-icons/fa6"; // Menghapus FaList karena tidak digunakan

function Navigation({ authLogin, onAuthSignOut }) {
  const { id, name, photo } = authLogin;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#162623', fontFamily: 'Arial, sans-serif' }}>
        <div className="container-fluid ">
          <h1>
            <Link className="navbar-brand" to="/" 
            style={{ marginLeft: '20px', fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold' }}
            >
              By-Course
            </Link>
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navApp"
            aria-controls="navApp"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navApp">
            <ul className="navbar-nav ms-auto">

              {/* Link ke halaman tambah course */}
              <li className="mt-2 mx-2">
                <Link
                  className="btn btn-light btn-sm text-dark"
                  to="/courses/add"
                  style={{ backgroundColor: '#F0F5F7', color: 'black', fontFamily: 'Arial, sans-serif', marginTop: '10px' }}
                >
                  <FaPlus /> Tambah Course
                </Link>
              </li>

              {/* User dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link mx-2 dropdown-toggle"
                  href="#"
                  id="navUser"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="nav-profile"
                    src={photo}
                    alt={id}
                    title={name}
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navUser"
                >
                  <li>
                    <Link className="dropdown-item" to="/users/me">
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={onAuthSignOut}
                    >
                      <FaRightFromBracket /> Sign out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

const authLoginShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authLogin: PropTypes.shape(authLoginShape).isRequired,
  onAuthSignOut: PropTypes.func.isRequired,
};

export default Navigation;
