// ۱. این خط را برای غیرفعال کردن prerendering استاتیک اضافه کنید
export const dynamic = 'force-dynamic';

export default async function orders() {
  const baseUrl = process.env.API_BASE_URL;
  let orders= [];
  if (!baseUrl) { 
    console.error("API_BASE_URL is not defined in environment variables!");
  }
  try {
    const res = await fetch(`${baseUrl}/api/orders`, {
      cache: 'no-store' // اطمینان از دریافت داده تازه
    });

    // ۲. چک کردن وضعیت پاسخ
    if (!res.ok) {
      console.error(`Error fetching orders: ${res.status} ${res.statusText}`);
    }

    orders = await res.json()
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
  if (!orders || orders.length === 0) {
    return <div className="p-10 text-center">هیچ سفارشی یافت نشد.</div>;
  }
  return (
    <>
    <div>this orders page</div>
    <table>
      <thead>
        <tr>
          <th>نام کاربر</th>
          <th>ایمیل</th>
          <th>کشور - شهر - کدپستی</th>
          <th>جمع کل</th>
          <th>وضعیت</th>
          <th>تاریخ</th>
          <th>محصولات</th>
        </tr>
      </thead>

      <tbody>
        {
          orders.map((order)=>(
            <tr key={order.id}>
               <td>{order.name}</td>
               <td>{order.email}</td>
               <td>{order.country} - {order.city} - {order.postalCode}</td>
               <td>{order.totalPrice} تومان</td>
               <td>{order.status}</td>
               <td>{new Date(order.creatAt).toLocaleDateString("fa-IR")}</td>
              <td>
              <ul>
                {order.order_items?.map((item, index) => (
                  <li key={index}>
                    {item.title} — <span className="font-bold">{item.quantity} عدد</span>
                  </li>
                ))}
              </ul>
            </td>
            </tr>
          ))
        }
      </tbody>
    </table>
    </>
  );
}
