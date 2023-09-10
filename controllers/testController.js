const testController = (req, res) => {
    res.status(200).send({
        message :"Welcome to new project",
        success : true
    })
}
module.exports = {testController}