import { AuthOptions, ISODateString, User } from "next-auth";


export type CustomSession = {
    user: CustomUser;
    expires: ISODateString;
};

export type CustomUser = {
    id: string | null;
    username: string | null;
    email: string | null;
};
