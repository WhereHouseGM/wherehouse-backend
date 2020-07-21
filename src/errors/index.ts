import { HttpError } from '@errors/http-error';
import { BadRequestError } from '@errors/bad-request-error';
import { NotFoundError } from '@errors/not-found-error';
import { ConflictError } from '@errors/conflict-error';

import { UserNotFoundError } from '@errors/user-not-found-error';
import { EmailAlreadyExistError } from '@errors/email-already-exist-error';

export default {
    HttpError,
    BadRequestError,
    NotFoundError,
    ConflictError,
    UserNotFoundError,
    EmailAlreadyExistError
};