import express from 'express'; // we can doit here bec in the package.json "type" : "module"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoute from './routes/authRoute.js';
import mongoConnect from './db/mongoConnect.js';
import messageRout from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();


app.use(express.json());//to parse the upcoming requests  from the user (req.body)
app.use(cookieParser());//to access the cookies for the user 

//this is a way to make the code simpler and easier to read when access tthis specific  rout it go to this file authRoutes
app.use('/api/auth' , authRoute);

app.use('/api/messages', messageRout);

app.use('/api/users', userRoutes);




app.listen(PORT , ()=>{
    mongoConnect();
    console.log(`running in ${PORT}`);
})