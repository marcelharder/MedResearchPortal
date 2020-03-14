export interface Coach {
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    image: string;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
}
