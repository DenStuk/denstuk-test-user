import { HttpError } from "./HttpError";

export class NotFoundError extends HttpError {
    public statusCode = 404;

    constructor(message: string) {
        super(404, message);
        this.message = message;
        this.statusCode = this.statusCode;

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}