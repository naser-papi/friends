import * as yup from "yup";

export const RegisterSchema = yup.object({
  firstName: yup.string().label("First Name").required().min(2).max(12),
  lastName: yup.string().label("Last Name").required().min(3).max(12),
  email: yup.string().label("Email Address").email("Please enter a valid email").required(),
  password: yup.string().label("Password").required().min(4),
  passwordConfirm: yup
    .string()
    .label("Password Confirm")
    .required()
    .oneOf([yup.ref("password")], "Confirm Password must be equal to password"),
  location: yup.string().label("Location").required().min(3).max(25),
  occupation: yup.string().label("Occupation").min(3),
  allowEmailNotification: yup.boolean().label("Allow Notifications"),
  picturePath: yup.string().label("Picture Path").required()
});
export type UserRegisterType = yup.InferType<typeof RegisterSchema>;

export const LoginSchema = yup.object({
  email: yup.string().label("Email Address").email("Please enter a valid email").required(),
  password: yup.string().label("Password").required().min(4)
});

export type UserLoginType = yup.InferType<typeof LoginSchema>;
