import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'src/enum/common.enum';
export const HasRoles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);