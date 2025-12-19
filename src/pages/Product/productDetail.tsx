import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../services/productService";
import type { Product } from "../../schemas/product.schema";

const IMAGE_DOMAIN = import.meta.env.VITE_IMAGE_DOMAIN;

export default function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchedRef = useRef(false);

  useEffect(() => {
  if (!id) return;
  if (fetchedRef.current) return; // 👈 CHẶN LẦN 2

  fetchedRef.current = true;

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const result = await productService.getById(Number(id));
      setProduct(result);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  return (
    <div className="row">
      <div className="col-md-5">
        <img
          src={product.image ? IMAGE_DOMAIN + product.image : "/images/no-image.png"}
          alt={product.name}
          className="img-fluid rounded"
        />
      </div>

      <div className="col-md-7">
        <h2>{product.name}</h2>

        <p className="text-danger fw-bold fs-4">
          {product.price != null ? product.price.toLocaleString() : '0'} đ
        </p>

        {product.description && (
          <p className="text-muted">{product.description}</p>
        )}

        <button className="btn btn-primary mt-3">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
