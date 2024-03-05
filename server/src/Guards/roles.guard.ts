import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/Decorators/roles.decorator';
import { Role } from 'src/Enums/role.enum';
import { AccessControlService } from 'src/Modules/shared/access-control/access-control.service';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private readonly accessControlService: AccessControlService,
	) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
        if (!requiredRoles) return true;
        console.log(requiredRoles);

        const { user } = context.switchToHttp().getRequest();
        const userRoles = [...user.roles];

        for (const role of userRoles) {
            console.log('role: ', role);
            if (requiredRoles.includes(role)) return true;
        }

        return false;
	}
}
