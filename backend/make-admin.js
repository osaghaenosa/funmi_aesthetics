import 'dotenv/config';
import mongoose from 'mongoose';
import User from './src/models/User.js';

const email = process.argv[2];

if (!email) {
  console.log('Please provide an email: node make-admin.js user@example.com');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const user = await User.findOne({ email });
  if (!user) {
    console.log(`User not found with email: ${email}`);
    process.exit(1);
  }

  user.role = 'admin';
  await user.save({ validateBeforeSave: false });
  console.log(`Success! ${email} is now an admin.`);
  process.exit(0);
}).catch(console.error);
