export interface UserType {
  id?: string;
  username: string;
  email: string;
  password: string;
  roles?: string[];
  active?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;
}

export interface UserReturnType {
  _id: string;
  username: string;
  email: string;
  roles?: string[];
}
