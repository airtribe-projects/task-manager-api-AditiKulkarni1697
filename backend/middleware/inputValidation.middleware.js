const inputValidation = (req,res,next) => {

    const {title, description, completed, priority} = req.body;

    if(!title || !description || typeof title !== 'string' || typeof description !== 'string' ){
        const err = new Error(`Provide correct input`)
        err.statusCode = 400
        throw err
    }

    if(completed && typeof completed !== 'boolean'){
        const err = new Error(`Provide correct input`)
        err.statusCode = 400
        throw err
    }

    if(priority){
        const lowerCasePriority = priority.toLowerCase()
        if(lowerCasePriority !== "low" && lowerCasePriority !== "medium" && lowerCasePriority !== "high"){
        const err = new Error(`Provide correct input`)
        err.statusCode = 400
        throw err
    }
    req.body.priority = lowerCasePriority
}

    next()

}

module.exports = {inputValidation}