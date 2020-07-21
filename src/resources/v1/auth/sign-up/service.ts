import { signUpRequestValidator } from '@resources/v1/auth/sign-up/validator';
import UserModel from '@models/user.model';
import { buildTokenResponse, TokenResponse } from '@resources/v1/auth/builder';
import db from '@models';
import { BadRequestError } from '@errors/bad-request-error';
import { EmailAlreadyExistError } from '@errors/email-already-exist-error';

const models = db.models;

export function validateRequest(body: any): void {
    try {
        const result = signUpRequestValidator.validate(body);

        if(result.error) throw new BadRequestError("회원가입에 필요한 정보를 다시 확인해주세요");
    } catch(error) {
        console.error(error);
        throw error;
    }
}

export async function createUserAndBuildTokenResponse(body: any): Promise<TokenResponse> {
    try {
        const newUser = await models['users'].create(body) as UserModel;
        return buildTokenResponse(newUser.id);
    } catch(e) {
        console.log(e);
        throw new EmailAlreadyExistError();
    }
}
