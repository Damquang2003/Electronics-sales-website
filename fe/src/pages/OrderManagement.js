// frontend/src/pages/OrderManagement.js
import React, { useEffect, useState } from "react";
import SummaryApi from "../common/index"; // Import SummaryApi
import { toast } from "react-toastify";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.data); // Giả sử data.data chứa danh sách đơn hàng
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders.");
    }
  };

  useEffect(() => {
    fetchOrders(); // Gọi hàm fetchOrders khi component được mount
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(SummaryApi.updateOrderStatus.url, {
        method: SummaryApi.updateOrderStatus.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Order status updated successfully.");
        fetchOrders(); // Gọi lại hàm fetchOrders để cập nhật danh sách
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred while updating order status.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(
        SummaryApi.deleteOrder.url.replace(":orderId", orderId),
        {
          method: SummaryApi.deleteOrder.method,
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Order deleted successfully.");
        fetchOrders(); // Gọi lại hàm fetchOrders để cập nhật danh sách
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("An error occurred while deleting the order.");
    }
  };

  return (
    <div>
      <h2>Order Management</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId.name}</td>
              <td>{order.productId.name}</td>
              <td>{order.quantity}</td>
              <td>{order.totalPrice}</td>
              <td>{order.status}</td>
              <td>
                <button
                  onClick={() => handleUpdateStatus(order._id, "shipped")}
                >
                  Ship
                </button>
                <button onClick={() => handleDeleteOrder(order._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
