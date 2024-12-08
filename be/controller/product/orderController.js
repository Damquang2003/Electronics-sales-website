// backend/controllers/orderController.js
const Order = require("../../models/orderModel");

// Lấy danh sách đơn đặt hàng
async function getOrders(req, res) {
  try {
    const orders = await Order.find().populate("userId").populate("productId");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Cập nhật trạng thái đơn hàng
async function updateOrderStatus(req, res) {
  const { orderId, status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Xóa đơn hàng
async function deleteOrder(req, res) {
  const { orderId } = req.params;
  try {
    await Order.findByIdAndDelete(orderId);
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  getOrders,
  updateOrderStatus,
  deleteOrder,
};
