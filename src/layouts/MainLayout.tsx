import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header id="header" className="bg-primary text-white">
        <div className="container d-flex justify-content-between py-3">
          <Link to="/" className="text-white text-decoration-none fw-bold">
            MyShop
          </Link>
          <nav>
            <Link className="text-white me-3" to="/">Home</Link>
            <Link className="text-white me-3" to="/product">Product</Link>
            <Link className="text-white" to="/contact">Contact</Link>
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
