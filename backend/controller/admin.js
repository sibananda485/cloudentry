const Notes = require("../models/Notes")
const User = require("../models/User")
async function handleAdminAllUser(req,res){
    const result = await User.find({});
    res.json({users:result})
}
async function handleAdminAllNotes(req,res){

    const result = await Notes.find({user:req?.params?.id});
    res.json({notes:result})

}

module.exports = {handleAdminAllNotes,handleAdminAllUser}