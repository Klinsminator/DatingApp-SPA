import { Photo } from './photo';

export interface User {
    // this is a typescript file which uses lowercase convention
    // Next list the properties received by the dto
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    // The question mark makes the variable optional
    // This should be all put after the required ones
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    // For Photo class should create a new interface too
    photos?: Photo[];
}
