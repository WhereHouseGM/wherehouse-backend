export class HttpError extends Error {
    message: string;
    statusCode: number;
    timestamp: number;

    constructor(message = "예기치 못한 문제가 발생했습니다", statusCode = 500, timestamp: number = Date.now()) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.timestamp = timestamp;
    }
}
