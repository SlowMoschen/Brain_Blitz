import { Injectable } from '@nestjs/common';
import { Role } from 'src/Enums/role.enum';

interface isAuthorizedParams {
	userRole: Role;
	requiredRole: Role;
}

@Injectable()
export class AccessControlService {
	private hierachies: Array<Map<string, number>> = [];
	private priority: number = 1;

	cpnstructor() {
		this.buildHierachies([Role.USER, Role.ADMIN]);
	}

	private buildHierachies(roles: Role[]) {
		const hierarchy: Map<string, number> = new Map();
		roles.forEach((role) => {
			hierarchy.set(role, this.priority);
			this.priority++;
		});
		this.hierachies.push(hierarchy);
	}

	public isAuthorized({ userRole, requiredRole }: isAuthorizedParams): boolean {
		console.log('isAuthorizedParams: ', { userRole, requiredRole });
		for (const hierarchy of this.hierachies) {
			const prio = hierarchy.get(userRole);
			const requiredPrio = hierarchy.get(requiredRole);

			if (prio && requiredPrio && prio >= requiredPrio) return true;
		}
		return false;
	}
}
