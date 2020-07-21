import { ConflictError } from '@errors/conflict-error';

export class EmailAlreadyExistError extends ConflictError {
    constructor() {
        super("중복된 이메일입니다.");
    }
}