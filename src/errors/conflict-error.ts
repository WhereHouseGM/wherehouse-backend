import { HttpError } from '@errors/http-error';

export class ConflictError extends HttpError {
    constructor(message = '충돌이 발생했습니다.', statusCode = 409, timestamp: number = Date.now()) {
        super(message, statusCode, timestamp);
    }
}