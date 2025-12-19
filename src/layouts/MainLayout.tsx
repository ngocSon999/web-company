import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";


const IMAGE_DOMAIN = import.meta.env.VITE_IMAGE_DOMAIN;

export default function MainLayout() {
  const navigate = useNavigate();
  const { isLoggedIn, customer, logout } = useAuth();

  const handleLogout = () => {
    logout();               // ✅ gọi context
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="container d-flex justify-content-between py-3">
          <Link to="/" className="text-white text-decoration-none fw-bold">
            MyShop
          </Link>

          <nav className="d-flex align-items-center">
            <Link className="text-white me-3" to="/">Home</Link>
            <Link className="text-white me-3" to="/product">Product</Link>
            <Link className="text-white me-3" to="/contact">Contact</Link>

            {!isLoggedIn && (
              <Link className="text-white me-3" to="/login">
                Login
              </Link>
            )}

            {isLoggedIn && (
              <div className="dropdown">
                <img
                  src={customer?.image ? IMAGE_DOMAIN + customer.image : "/images/no-image.png" } 
                  alt={customer?.name ?? ""}
                  title={customer?.name ?? ""}
                  className="rounded-circle dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ width: 40, height: 40, objectFit: "cover", cursor: "pointer" }}
                />

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main id="main" className="flex-grow-1">
        <div className="container py-4">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-dark text-white text-center py-3">
        © 2025 MyShop
      </footer>
    </div>
  );
}
