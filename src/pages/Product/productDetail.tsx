import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../services/productService";
import { z } from "zod";

const IMAGE_DOMAIN = import.meta.env.VITE_IMAGE_DOMAIN;

const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.coerce.number(),
  image: z.string(),
  description: z.string().optional(),
});

type Product = z.infer<typeof ProductSchema>;

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
      const result = await productService.getById<Product>(Number(id));
      const product = ProductSchema.parse(result);
      setProduct(product);
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
          src={IMAGE_DOMAIN + product.image}
          alt={product.name}
          className="img-fluid rounded"
        />
      </div>

      <div className="col-md-7">
        <h2>{product.name}</h2>

        <p className="text-danger fw-bold fs-4">
          {product.price.toLocaleString()} đ
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
