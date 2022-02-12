export type Territory = {
	id: string;
	name: string;
	parent: string | null;
}

// Transfer these interfaces back to ApiHelper once CORS is allowed
export interface TerritoryResponse {
    data: Territory[];
}

export interface UserResponse {
    username: string | null;
    displayName: string | null;
    roles: string[];
    status: "401" | "200" | "500";
}

export interface ErrorResponse {
    message: string;
    status: "401" | "200" | "500";
}