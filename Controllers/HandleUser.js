import UserModel from "../Models/UserModels.js";
import { PasswordHashing, ComparePassword } from '../Utilities/AuthUser.js';
import jwToken from 'jsonwebtoken'



// User Registration
const handleUserRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const checkEmail = await UserModel.findOne({ email });
        if (checkEmail) {
            return res.status(200).send({
                success: false,
                message: "Email has already existed, Please Login"
            })
        }

        const hasPassword = await PasswordHashing(password);

        const newUser = await UserModel.create({
            name, email, password: hasPassword
        })

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            newUser
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Server side"
        })
    }
}

// User Login

const handleUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send({
                success: false,
                message: "Invalid email or Password"
            })
        }

        const userData = await UserModel.findOne({ email })

        // Check User
        if (!userData) {
            return res.send({
                success: false,
                message: "Email is not registered"
            })
        }

        // Check Password
        const checkPassword = await ComparePassword(password, userData.password)

        if (!checkPassword) {
            return res.send({
                success: false,
                message: "Incorrect Password"
            })
        }

        // Create jwToken
        const jwtoken = await jwToken.sign({ _id: userData._id }, process.env.JWT_SECRET, { expiresIn: '2d' })

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: userData.name,
                email,
                phone: userData.phone,
                address: userData.address,
                role:userData.role
            },
            jwtoken
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Server side"
        })
    }
}


// handleUserDashBoard

const handleUserDashBoard = async (req, res) => {
    res.status(200).send(
        { ok: true }
    )
}




// test route controller

const handleTestRoute = (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: "Protected Route"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Server side"
        })
    }
}

const handleDeleteUSer = async (req, res) => {
    await UserModel.findByIdAndDelete(req.params.id)

    res.status(200).send({
        success:true,
        message:"User deleted successfully"
    })
}

const handleUpdateUser = async (req, res) => {
    const { name , email, password} =  req.body
    if(password){
        var hashPassword = await PasswordHashing(password)
    }

    const updateUser = await UserModel.findByIdAndUpdate(req.params.id, {name, email, password:hashPassword})

    res.status(200).send({
        success:true,
        message:"User updated successfully",
        updateUser
    })
}

export { handleUserRegister, handleUserLogin, handleTestRoute, handleUserDashBoard, handleDeleteUSer , handleUpdateUser};