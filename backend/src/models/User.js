import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
  label:    { type: String, default: 'Home' },
  line1:    String,
  line2:    String,
  city:     String,
  state:    String,
  country:  String,
  zip:      String,
  isDefault:{ type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
  {
    firstName:  { type: String, required: true, trim: true },
    lastName:   { type: String, required: true, trim: true },
    email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:   { type: String, required: true, minlength: 8, select: false },
    avatar:     { type: String, default: '' },
    phone:      { type: String, default: '' },
    role:       { type: String, enum: ['customer', 'admin'], default: 'customer' },
    addresses:  [addressSchema],
    wishlist:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
    lastLogin:  Date,
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Full name virtual
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.set('toJSON', {
  virtuals: true,
  transform: (_, obj) => {
    delete obj.password;
    delete obj.verificationToken;
    delete obj.resetPasswordToken;
    return obj;
  },
});

export default mongoose.model('User', userSchema);
