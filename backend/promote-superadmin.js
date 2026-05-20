require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to DB');
        const user = await User.findOneAndUpdate(
            { email: 'admin@taskops.com' },
            { role: 'SuperAdmin' },
            { new: true }
        );
        if (user) {
            console.log(`Successfully promoted ${user.email} to SuperAdmin`);
        } else {
            console.log('User admin@taskops.com not found');
        }
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
