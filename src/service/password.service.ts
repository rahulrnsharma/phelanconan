import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {

    static hash = (password) => {
        return bcrypt.hash(password, Number(process.env.SALT_ROUND));
    }
    static compare = (password, hash: string) => {
        return bcrypt.compare(password, hash);
    }
}