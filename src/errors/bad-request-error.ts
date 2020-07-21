import { HttpError } from '@errors/http-error';

export class BadRequestError extends HttpError {
    constructor(message = "잘못된 요청입니다", statusCode = 400, timestamp: number = Date.now()) {
        super(message, statusCode, timestamp);
    }
}