import mongoose from "mongoose";


const DBconnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
            .then(() => console.log("DataBase Connected Successfully"))
    } catch (error) {
        console.log("Server Connection Failed")
        console.log(error)
    }
}


export default DBconnection;

