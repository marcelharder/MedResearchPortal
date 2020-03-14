import { Course } from './course';
import { Invoice } from './Invoice';


export interface User {
    id: number;
    username: string;
    role: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    image: string;
    lastActive: Date;
    photoUrl: string;
    city: string;
    phone: string;
    email: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    courses?: Course[];
    invoices?: Invoice[];
}
