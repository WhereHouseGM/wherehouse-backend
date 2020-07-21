import { HttpError } from '@errors/http-error';

export class NotFoundError extends HttpError {
    constructor(message = '리소스를 찾지 못했습니다.', statusCode = 404, timestamp = Date.now()) {
        super(message, statusCode, timestamp);
    }
}