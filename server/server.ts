import express from "express";
import path from "path";
import cookieParser from 'cookie-parser';
import errorMiddleware from "./middlewares/error";
import userRoutes from "./routes/userRoutes";
import noteRoutes from './routes/noteRoutes';


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// // serve static files
// app.use(express.static(path.join(__dirname, "../../client/dist")));

// routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', noteRoutes);

// // Catch-all route to serve the React app
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
// });

// error middleware
app.use(errorMiddleware);

const port = process.env.PORT || 8000;

// Start the server
app.listen(port, () => {
  console.log(`🔥 Server is listening on port ${port}`);
});
