// create custom api error class from error class
class CustomAPIError extends Error {
    constructor(message){
        super(message)
    }
}

export default CustomAPIError;