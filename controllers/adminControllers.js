const home = async (req, res) => {
    return res.render("home")
}

const adminTable = async (req, res) => {
    return res.render("admin_table")
}

module.exports = {home, adminTable}