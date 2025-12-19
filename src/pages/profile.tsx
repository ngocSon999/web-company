import { useAuth } from "../contexts/authContext";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  image?: string | null;
  company_id: number;
}

const IMAGE_DOMAIN = import.meta.env.VITE_IMAGE_DOMAIN;

export default function Profile() {
  const { customer, isLoggedIn } = useAuth();

  // Chưa login
  if (!isLoggedIn) {
    return <p className="text-danger">Bạn chưa đăng nhập</p>;
  }

  // Có login nhưng chưa có data
  if (!customer) {
    return <p>Không có dữ liệu người dùng</p>;
  }

  const c = customer as Customer;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Thông tin cá nhân</h2>

      <div className="row justify-content-center">
        {/* Avatar */}
        <div className="col-md-4 text-center mb-3">
          <img
            src={
              c.image
                ? IMAGE_DOMAIN + c.image
                : "/images/no-image.png"
            }
            alt={c.name}
            className="img-fluid rounded shadow"
            style={{
              maxHeight: 200,
              objectFit: "cover",
              width: "100%",
            }}
          />
        </div>

        {/* Info */}
        <div className="col-md-6">
          <ul className="list-group list-group-flush shadow-sm rounded">
            <li className="list-group-item d-flex justify-content-between">
              <strong>Tên</strong>
              <span>{c.name}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <strong>Email</strong>
              <span>{c.email}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <strong>Điện thoại</strong>
              <span>{c.phone || "—"}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <strong>Địa chỉ</strong>
              <span>{c.address || "—"}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <strong>Company ID</strong>
              <span>{c.company_id}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
