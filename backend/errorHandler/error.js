export class CustomError extends Error{
    constructor(status_code,message){
        super()
        this.status_code = status_code
        this.message = message
    }
}
