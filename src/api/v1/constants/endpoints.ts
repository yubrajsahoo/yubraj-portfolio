export const API_ENDPOINTS = {
    USERS: '/api/v1/users',
    USER_ROLE: (email: string, roleName: string) => `/api/v1/users/${email}/roles/${roleName}`,
    ROLES: '/api/v1/users/roles',
    ROLE_PRIVILEGE: (roleName: string, privilegeName: string) => `/api/v1/users/roles/${roleName}/privileges/${privilegeName}`,
    PRIVILEGES: '/api/v1/users/privileges',
    FILES: '/api/v1/constants',
    FILE: (fileName: string) => `/api/v1/files/${fileName}`,
    HEALTH: '/actuator/health',
    CONTACT: '/api/v1/contact',
} as const;
