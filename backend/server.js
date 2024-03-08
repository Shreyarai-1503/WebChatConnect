import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";

import connectToMongoDB from "./db/index.js";
import { app, server } from "./socket/socket.js"

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());  //to parse incoming request with JSON payload
app.use(cookieParser());  //to access cookies


//************************************* Import Routers ***********************
import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/users.routes.js";

//****************************************** Routes **************************
app.use("/api/auth", authRoutes);
app.use("/api/message", messagesRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.get("/", (req, res) => {
    res.send("Hello");
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server listening on http://localhost:${PORT}`)
});