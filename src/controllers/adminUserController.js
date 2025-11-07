import User from "../model/user.js"

export const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || ""

        const filter = {
            role: "user",
            $or: [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ]
        }
        const totalUsers = await User.countDocuments(filter)
        const users = await User.find(filter)
            .select("-password")
            .skip((page - 1)*limit)
            .limit(limit)
            .sort({createdAt: -1})
        res.json({
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers/limit),
            currentPage: page,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}


export const blockUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isBlocked: true });
        res.json({ message: "User blocked successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export const unblockUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isBlocked: false });
        res.json({ message: "User unblocked successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};