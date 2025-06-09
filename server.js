import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import userRoute from './routes/automationRoutes.js'

dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/user", userRoute);
    
server.listen(PORT, () => {

      console.log(`Server is running at http://localhost:${PORT}`);

});