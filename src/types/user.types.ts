export interface User {
  me: {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
