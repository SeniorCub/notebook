import express from 'express'
import path from 'path'
import dotenv from 'dotenv';

const app = express()
dotenv.config();

app.use(express.json())
app.use("/", express.static(path.join(process.cwd(), "/public")))

const PORT = (process.env.PORT || 1010 );
app.listen(PORT, ()=>{
     console.log(`Server running on http://localhost:${PORT}`);
})