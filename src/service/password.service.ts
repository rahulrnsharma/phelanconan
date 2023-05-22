import * as bcrypt from 'bcrypt';

export class PasswordService {

    static hash = (password: string) => {
        return bcrypt.hash(password, Number(process.env.SALT_ROUND));
    }
    static compare = (password: string, hash: string) => {
        return bcrypt.compare(password, hash);
    }
}