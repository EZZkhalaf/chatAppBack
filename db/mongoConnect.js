import mongoose from 'mongoose';

const mongoConnect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to mongo db ');
    }catch(err){
        console.error("error with connecting to M db ");
    }
}

export default mongoConnect;