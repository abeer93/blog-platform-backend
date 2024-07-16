import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User  from "../src/models/User";
import { MONGO_DB_HOST, MONGO_DB_name } from '../src/config/config';


async function seedDefaultUser() {
    try {
        await mongoose.connect(`mongodb://${MONGO_DB_HOST}/${MONGO_DB_name}`);

        const existingUser = await User.findOne({ name: 'admin' });

        if (existingUser) {
            console.log('Default admin user already exist.');
            return;
        }

        const newUser = new User({
            name: 'admin',
            email: 'admin@example.com',
            password: await bcrypt.hash('admin@123', 10),
            isAdmin: true
        });

        await newUser.save();

        console.log('Default user created successfully.');
    } catch (error) {
        console.error('Error seeding default user:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seedDefaultUser();

