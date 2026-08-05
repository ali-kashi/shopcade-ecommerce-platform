export default async function orders() {
  const baseUrl = process.env.API_BASE_URL;
  const res = await fetch(`${baseUrl}/api/orders`)
  const orders = await res.json()
  console.log(JSON.stringify(orders, null, 2));
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
