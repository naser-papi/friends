import mongoose from "mongoose";

export async function validateEmail(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValid = re.test(email);
    if (!isValid) return false;

    if (!this.isNew && !this.isModified('email')) return true;

    try {
        const User = mongoose.model("User");

        const count = await User.countDocuments({email: email});
        return count <= 0;
    } catch (error) {
        return false;
    }
};
