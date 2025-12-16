import { useEffect, useState } from "react";
import { productService } from "../../services/productService";

const IMAGE_DOMAIN = import.meta.env.VITE_IMAGE_DOMAIN;

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (pageNumber: number) => {
    try {
      setLoading(true);

      const res = await productService.getByCompany<Product>(3, pageNumber);
      setProducts(res.data);
      setPage(res.current_page);
      setLastPage(res.last_page);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  return (
    <>
      <h1 className="mb-4">Danh sách sản phẩm</h1>

      {loading && <p>Đang tải...</p>}

      <div className="row g-4">
        {products.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <img
                src={IMAGE_DOMAIN + p.image}
                alt={p.name}
                className="card-img-top"
                style={{ height: 200, objectFit: "cover" }}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/300x200?text=No+Image")
                }
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>

                <p className="text-danger fw-bold mt-auto">
                  {p.price.toLocaleString()} đ
                </p>

                <button className="btn btn-outline-primary btn-sm mt-2">
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => fetchProducts(page - 1)}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
            <li key={p} className={`page-item ${page === p ? "active" : ""}`}>
              <button className="page-link" onClick={() => fetchProducts(p)}>
                {p}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === lastPage ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => fetchProducts(page + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
