const { userModel } = require("./db/user");



const userSignupController = async (req, res, next) => {
    const { email, name } = req.body;
    try {
        const form = await new userModel({
            email, name
          });
      
          const userDetails = await form.save();
  
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "signup process successful",
        data:  userDetails
      });
    } catch (error) {
      console.log(error);
      // return handleError(error.message)(res);
    }
};
  
module.exports = {
    userSignupController 
}