import bcrypt from 'bcrypt'


// Convert HashPassword
const PasswordHashing = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log("Error in HashedPassword", error)
    }
}

// Compare HashPassword
const ComparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}


export { PasswordHashing, ComparePassword};