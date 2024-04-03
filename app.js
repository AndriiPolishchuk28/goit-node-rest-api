import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import contactsRouter from "./routes/contactsRouter.js";
import dotenv from "dotenv";
import usersRouter from "./routes/usersRouter.js";

dotenv.config();

const { DB_HOST, PORT } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(5000);
    console.log("Mongodb connected");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

export default app;

// const socketList = [];

// import { WebSocketServer } from "ws";
// const wsServer = new WebSocketServer({ port: 4000 });
// wsServer.on("connection", (socket) => {
//   setTimeout(() => socket.send("welcome to ws server"), 3000);
//   socketList.forEach((item) =>
//     item.send(`now we have ${socketList.length + 1} members`)
//   );
//   socketList.push(socket);
// });
