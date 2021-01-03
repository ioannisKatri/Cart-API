// Utilizing declaration merging
interface UserPayload {
    id: string;
    email: string;
}

declare namespace Express {
    export interface Request {
        user: UserPayload;
    }
}