export class HttpError extends Error {
    public statusCode = 500;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;

        Object.setPrototypeOf(this, HttpError.prototype);
    }
}