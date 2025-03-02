class ExpressError extends Error {
    constructor(status, message){
        super();
        this.statu = status;
        this.message = message
    }
}

module.exports = ExpressError