import { Router } from "express";
import usersRouter from "../modules/users/api/routes.js";
import AppError from "./AppError.js";

const router = Router()

// http://localhost:8080/v1/

router.use('/v1/users/', usersRouter)
router.get('/v1/pruebas', async (req, res, next) => {res.send("Prueba Pruebas")});
router.all('*', (req, res, next) => { next(new AppError(`No se encuentra la url: ${req.originalUrl} en este servidor`, 404)); });


export default router