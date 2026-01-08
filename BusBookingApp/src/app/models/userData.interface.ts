export interface UserRegisterInterface {
  userId: number;
  userName: string;
  emailId: string;
  fullName: string;
  role: string;
  createdDate: Date;
  password: string;
  projectName: string;
  refreshToken: string;
  refreshTokenExpiryTime: Date;
}
