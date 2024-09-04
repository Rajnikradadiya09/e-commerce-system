import express from 'express'
import { handleUserRegister, handleUserLogin, handleTestRoute, handleDeleteUSer, handleUpdateUser } from '../Controllers/HandleUser.js';
import { checkToken } from '../Middlewares/userMiddleware.js';

const Router = express.Router();


Router
    .post("/register", handleUserRegister)
    .post("/login", handleUserLogin)
    .delete('/delete-user/:id', handleDeleteUSer)
    .put('/update-user/:id', handleUpdateUser )

// test route
Router.get("/test",checkToken, handleTestRoute)




export default Router;