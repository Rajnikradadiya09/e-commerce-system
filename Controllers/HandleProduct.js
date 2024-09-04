
import ProductModel from "../Models/ProductModel.js";

//Create New product
const handleCreateProduct = async (req, res) => {
    try {
        // const { name, description, price, category } = req.body

        const product = new ProductModel({
            ...req.body
        });
        await product.save()

        res.status(201).send({
            success: true,
            message: "New Product is created successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        })
    }

}
//get all product list
const handleGetAllProduct = async (req, res) => {
    try {
        const product = await ProductModel.find({}).populate('user')
        res.status(200).send({
            success: true,
            total: product.length,
            product
        })
    } catch (error) {
        console.log(error)

        res.status(500).send({
            success: false,
            message: "Internal Server Failed",
            error
        })
    }
}

//get product by slug
const handleSingleProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id).populate("user")
        res.status(200).send({
            success: true,
            message: "Product Updated successfully",
            total: product.length,
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Failed",
            error
        })
    }
}


//Update Product
const handleUpdateProduct = async (req, res) => {
    // console.log(req.body)
    const { name, description, price, category } = req.body

    const UpdatedProduct = await ProductModel.findByIdAndUpdate(req.params.id,
        {
            name, description, price, category
        }, { new: true }).populate('user')

    res.status(200).send({
        success: true,
        message: "Product updated successfully",
        UpdatedProduct
    })
}

//delete product by id
const handleDeleteProduct = async (req, res) => {
    try {
        const data = await ProductModel.findByIdAndDelete(req.params.id)
        if (data) {
            return res.status(200).send({
                success: true,
                message: "Product deleted Successfully"
            })
        }
        res.status(400).send({
            success: false,
            message: "Somthing went wrong!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Serever Failed",
            error
        })
    }
}

export { handleCreateProduct, handleGetAllProduct, handleSingleProduct, handleUpdateProduct, handleDeleteProduct }