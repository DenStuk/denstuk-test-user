import { IRequestError } from "../interfaces/IRequestError";
import { IRequestResult } from "../interfaces/IRequestResult";

export class BaseController {

    public constructor() { }

    public serializeResult(statusCode: number, data?: any): IRequestResult {
        return { statusCode, data };
    }

}