import express, { Application,NextFunction,Request,Response  } from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'

import invoicesRouter from "./Routes/invoicesRoute"
import servicesRouter from "./Routes/servicesRoute"

const server:Application = express();

mongoose
  .connect("mongodb://localhost:27017/CMSDB")
  .then(() => {
    console.log("database connected");
    server.listen(process.env.PORT || 8080, () => {
      console.log("sever is listening ");
    });
  })
  .catch(() => {
    console.log("data error");
  });

  server.use(morgan("tiny"));

server.use(express.json());

// serve Routes
server.use(invoicesRouter);
server.use(servicesRouter);

server.use((request:Request, response:Response) => {
  response.status(404).json({
    message: "Not Found",
  });
});

server.use((error:any, request:Request, response:Response, next:NextFunction) => {
  response.status(error.status || 500).json({
    message: "Internal Error" + error,
  });
});

