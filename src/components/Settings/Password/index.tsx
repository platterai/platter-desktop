import { useContext, useState } from "react";
import { isEmpty } from "lodash";

import { toast } from "react-hot-toast";
import Field from "../../CustomUI/Field";
import UserContext from "../../../context/UserContext";
import { requestPost } from "../../../services/baseService";

type PasswordProps = {};

const Password = ({}: PasswordProps) => {
  const contextValue = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorConfirm, setErrorConfirm] = useState<string>("");

  const submitChangePassword = async ({ data }: any) => {
    try {
      const responseData = await requestPost<any>("/v1/auth/change-password", {
        data,
        token: contextValue?.token,
      });

      console.log("submitChangePassword--->", { responseData });
      if (responseData?.statusCode === 200) {
        toast.success(responseData?.message);
      } else {
        toast.error(responseData?.message);
      }
    } catch (error: any) {
      console.error({ error });
      toast.error(error?.response?.data?.message?.[0]);
    }
  };

  return (
    <form
      className=''
      action=''
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const passwordData = {
          oldPassword: formData.get("oldPassword"),
          newPassword: formData.get("newPassword"),
        };
        submitChangePassword({ data: passwordData });
      }}
    >
      <div className='mb-8 h4 md:mb-6'>Change Password</div>
      <Field
        name='oldPassword'
        className='mb-6'
        label='Password'
        placeholder='Password'
        type='password'
        icon='lock'
        value={oldPassword}
        onChange={(e: any) => setOldPassword(e.target.value)}
        required
      />
      <Field
        name='newPassword'
        className='mb-6'
        label='New password'
        placeholder='New password'
        // note='Minimum 8 characters'
        type='password'
        icon='lock'
        value={newPassword}
        onChange={(e: any) => setNewPassword(e.target.value)}
        required
      />
      <Field
        name='newPassword2'
        className='mb-6'
        label='Confirm new password'
        placeholder='Confirm new password'
        // note='Minimum 8 characters'
        type='password'
        icon='lock'
        value={confirmPassword}
        onChange={(e: any) => {
          setConfirmPassword(e.target.value);
          if (e.target.value !== newPassword) {
            setErrorConfirm("Password not match");
          } else {
            setErrorConfirm("");
          }
        }}
        error={isEmpty(errorConfirm) ? false : errorConfirm}
        required
      />
      <button className='btn-blue w-full'>Change password</button>
    </form>
  );
};

export default Password;
