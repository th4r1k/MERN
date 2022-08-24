export interface UserType {
  username: string;
  email: string;
  password: string;
  roles: string[];
  active: boolean;
  resetPasswordToken: string;
  resetPasswordExpires: string;
}
