function testController(req,res){
    res.status(200).send({
        message: "Welcome User",
        success: true
    })
}

export default testController;