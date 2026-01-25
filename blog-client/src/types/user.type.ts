export enum Role {
	ADMIN,
	USER
}

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    phone: string | null;
    role: Role;
    status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}
