import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },
  image:    String,
  price:    { type: Number, required: true },
  qty:      { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems:    [orderItemSchema],
    shippingAddress: {
      fullName: String,
      line1:    String,
      line2:    String,
      city:     String,
      state:    String,
      country:  String,
      zip:      String,
      phone:    String,
    },
    itemsPrice:    { type: Number, required: true },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice:    { type: Number, required: true },
    currency:      { type: String, enum: ['USD', 'NGN'], default: 'USD' },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id:       String,
      status:   String,
      updateTime: String,
      email:    String,
    },
    isPaid:        { type: Boolean, default: false },
    paidAt:        Date,
    isDelivered:   { type: Boolean, default: false },
    deliveredAt:   Date,
    trackingNumber:String,
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
