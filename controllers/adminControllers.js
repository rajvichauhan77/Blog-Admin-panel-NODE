const adminTbl = require("../models/adminTbl")
const nodemailer = require("nodemailer");

const adminProfile = async (req, res) => {
    try{
        return res.render("adminProfile")
    }
    catch{
        console.log(error)
        return res.redirect("/admin")
    }
}


const adminLogin = async (req, res) => {
    try{
        return res.render("adminLogin")
    }
    catch(error){
        console.log(error)
        return res.redirect("/admin")
    }
}

const checkAdminLogin = async (req, res) => {
    try {
        console.log("req.body")
        return res.redirect("/dashboard")
    }
    catch{
         console.log(error)
        return res.redirect("/admin")
    }
}

const home = async (req, res) => {
    return res.render("home", {
       admin: req.session.admin || null
    });
};


const adminTable = async (req, res) => {
    try {
      let page = parseInt(req.query.page) || 0;
        let perPage = 2;

        let data = await adminTbl.find()
            .skip(perPage * page)
            .limit(perPage);

        let totalRecord = await adminTbl.countDocuments();
        let totalPage = Math.ceil(totalRecord / perPage);

        return res.render("admin_table", {
            data,
            admin: req.currentUser,
            totalPage,
            currentPage: page,
            search: ""
        });

    } catch (error) {
        console.log(error)
    }
}


const adminForm = async (req, res) => {
    return res.render("admin_form")
}

const insertAdmin = async (req, res) => {
    console.log(req.body)
    console.log(req.file)

    if(req.file){
        req.body.avatar = req.file.path
    }
    try {
        let data = await adminTbl.create(req.body)
        return res.redirect("/admin_form")
    } catch (error) {
        console.log(error)
    }
}

const editAdmin = async (req, res) => {
    try {
        const id = req.query.userId; // Read userId here
        const admin = await adminTbl.findById(id);

        if (!admin) {
            return res.status(404).send("Admin not found");
        }

        res.render("edit_admin", { admin });
    } catch (error) {
        console.log("Error in editAdmin:", error);
        res.status(500).send("Server error");
    }
};

const updateAdmin = async (req,res) => {
    let id = req.params.id

   
     if(req.file){
        req.body.avatar = req.file.path
     }
     
     if(req.params.id)
     {
        if(req.body.avatar){
            let resp = await adminTbl.findByIdAndUpdate(id, req.body)
        }else{
            let avUp = await adminTbl.findById(id)
            req.body.avatar = avUp.avatar
            let resp = await adminTbl.findByIdAndUpdate(id, req.body)
        }
        return res.redirect("/admin_table")
     }
     else{
        return res.redirect("404")
    }
}

const deleteAdmin = async (req, res) => {
    try {
        let id = req.params.id;
        await adminTbl.findByIdAndDelete(id);
        return res.redirect("/admin_table");
    } catch (error) {
        console.log("Delete Error:", error);
        return res.status(500).send("Failed to delete admin");
    }
};



const SearchAdminData = async (req,res) => {
    try {
        let search = ''
        if(req.query){
            search = req.query.adminSearch
        }

        
        let page = 0
        if(req.query.page>0){
            page = req.query.page
        }
        let perPage = 2
        
        let searchAllRecord = await adminTbl.find({
          $or : [  
            { name : { $regex: search, $options: 'i'} },
            { email : { $regex: search, $options: 'i'} },
            { city : { $regex: search, $options: 'i'} },
            { gender : { $regex: search, $options: 'i'} },
        ] }
        ).skip(perPage*page).limit(perPage)

        let totalRecord = await adminTbl.find().countDocuments()
        let totalPage = Math.ceil(totalRecord/perPage)

        // console.log(Math.ceil(totalRecord/perPage))



        console.log(searchAllRecord)
        return res.render("admin_table", {
            data: searchAllRecord,
            totalPage,
            currentPage: parseInt(page),
            search: search
        });


    } catch (error) {
        console.log(error)
        res.redirect("/admin_table")
    }
}


// forgot password routes logic start

const sendOTP = async (req, res) => {
    try {
        // console.log(req.body)
        let admin = await adminTbl.findOne({ email: req.body.email });
        if (admin){
            const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
        },
        });
        }
        else{
            console.log("Invalid email")
            return res.redirect("/verifyEmail");
        }

    } catch (error) {
        console.log("Error in sendOTP:", error);
    }
}

// forgot password routes logic end


module.exports = {home, adminTable, adminForm, insertAdmin, editAdmin, updateAdmin, SearchAdminData, deleteAdmin, adminLogin, checkAdminLogin , adminProfile, sendOTP }