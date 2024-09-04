import express from 'express'
import { handleCreateProduct, handleGetAllProduct, handleSingleProduct, handleDeleteProduct, handleUpdateProduct } from '../Controllers/HandleProduct.js'
import { checkToken } from '../Middlewares/userMiddleware.js'


const productRouter = express.Router()


productRouter
    .post('/create-product',checkToken, handleCreateProduct)
    .get('/product-list', handleGetAllProduct)
    .get('/product-list/:id', handleSingleProduct)
    .put('/product-update/:id', handleUpdateProduct)
    .delete('/product-delete/:id', handleDeleteProduct)

export default productRouter