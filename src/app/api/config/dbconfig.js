import mongoose from 'mongoose';

const DBconnection = () => {
    mongoose.connect(process.env.NEXT_PUBLIC_DATABASE_URI)
    .then(() => console.log('DB connection established'))
    .catch(err => console.error('DB connection error:', err));
}


export default DBconnection