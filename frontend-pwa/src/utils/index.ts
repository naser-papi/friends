export function HasAccess(userRoles: string[], roles: string[]) {
  for (let i = 0; i < roles.length; i++) {
    if (userRoles.indexOf(roles[i]) > -1) {
      return true;
    }
  }
  return false;
}
