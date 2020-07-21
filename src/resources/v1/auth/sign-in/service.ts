import UserModel from '@models/user.model';
import { BadRequestError } from '@errors/bad-request-error';
import { signInRequestValidator } from '@resources/v1/auth/sign-in/validator';
import { UserNotFoundError } from '@errors/user-not-found-error';

export function validateRequest(body: any): void {
    try {
        const result = signInRequestValidator.validate(body);

        if(result.error) throw new BadRequestError("로그인에 필요한 정보를 다시 확인해주세요");
    } catch(error) {
        console.error(error);
        throw error;
    }
}

export async function checkUserEmailAndPassword(body: any): Promise<UserModel> {
    try {
        const user = await UserModel.findOne({
            where: { email: body.email, password: body.password },
        });

        if (user === null) throw new UserNotFoundError();

        return user;
    } catch(e) {
        console.error(e);
        throw e;
    }
}