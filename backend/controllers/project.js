const User = require("../models/userModel");
const Project = require("../models/projectModal");

exports.createProject = async(req,res) => {
    try{
        const {userID,title} = req.body;

        if(!userID || !title){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        const userDetails = await User.findOne({_id:userID});

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not find with this userId",
            })
        }

        const project = Project.create({
            title:title,
            createdBy:userID,
        });

        return res.status(200).json({
            success:true,
            message:"Project created successfully",
            projectId:project._id,
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"There is some error in creating project",
        })
    }
}

exports.getProjects = async(req,res) => {
    try{
        const {userID} = req.body;

        if(!userID){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        const userDetails = await User.findOne({_id:userID});

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not find by this userId",
            })
        }

        const allProject = await Project.find({createdBy:userID});

        return res.status(200).json({
            success:true,
            message:"All projects fetched successfully",
            projects:allProject,
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"There is some error in getProjects"
        })
    }
}

exports.deleteProject = async(req,res) => {
    try {

        const {userID,projectID} = req.body;
        let userDetails = await User.findOne({_id:userID});

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"user not found with this userId",
            })
        }

        let projectDelete = await Project.findOneAndDelete({_id:projectID});

        return res.status(200).json({
            success:true,
            message:"Project deleted successfully",
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"There is some error in delete Project",
        })
    }
}

exports.getProject = async(req,res) => {
    try {
        const {userID,projectID} = req.body;

        if(!userID || !projectID){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        let userDetails = await User.findOne({_id:userID});

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"user not found with this userId",
            })
        }

        const projectDetails = await Project.findOne({_id:projectID}).populate("createdBy");

        return res.status(200).json({
            success:true,
            message:"project with given projectId fetched successfully",
            project:projectDetails,
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"There is some error in get Project",
        })
    }
}

exports.updateProject = async(req,res) => {
    try {
        const {userID,projectID,jsCode,htmlCode,cssCode} = req.body;

        if(!userID || !projectID || !jsCode || !htmlCode || !cssCode){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        let userDetails = await User.findOne({_id:userID});

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"user not found with this userId",
            })
        }

        const updatedProject = await Project.findOneAndUpdate({_id:projectID},
                                                    {htmlCode:htmlCode,jsCode:jsCode,cssCode:cssCode}  ,
                                                    {new:true}     
                                                   );                                           

        return res.status(200).json({
            success:true,
            message:"project with given projectId updated successfully",
            project:updatedProject,
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"There is some error in updating Project",
        })
    }
}
