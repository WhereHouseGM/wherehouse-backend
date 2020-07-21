import { NotFoundError } from '@errors/not-found-error';

export class UserNotFoundError extends NotFoundError {
    constructor() {
        super("사용자가 존재하지 않습니다.");
    }
}