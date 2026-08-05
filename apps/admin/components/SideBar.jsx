import { FiHome, FiBox, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link href="/" className="link">
        <FiHome />
        <span>داشبورد</span>
      </Link>
      <Link href="/products" className="link">
        <FiBox />
        <span>محصولات</span>
      </Link>
      <Link href="/orders" className="link">
        <FiShoppingCart />
        <span>سفارشات</span>
      </Link>
    </div>
  );
};

export default Sidebar