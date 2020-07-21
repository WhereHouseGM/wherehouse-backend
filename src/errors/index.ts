import { HttpError } from './http-error';
import { BadRequestError } from './bad-request-error';
import { NotFoundError } from '@errors/not-found-error';

import { UserNotFoundError } from '@errors/user-not-found-error';

export default {
    HttpError,
    BadRequestError,
    NotFoundError,
    UserNotFoundError
};