import mongoose from 'mongoose';

export async function ConnectionToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('Error occured in connecting with DB. ' + err);
            process.exit();
        })
    } catch (error) {
        console.log(error);
    }
}