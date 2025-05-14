import express from "express";
import cors from "cors";
import "express-async-errors";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = process.env['PORT'] || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: "http://localhost:5173"}));

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.get('', (request, response) => {
    return response.status(200)
});

app.listen(port, () => {
    console.log(`Server started and is running at http://localhost:${port}`);
});
