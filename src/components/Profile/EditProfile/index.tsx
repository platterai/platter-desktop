// ---------- REACT/NEXT ----------
import { useContext, useEffect, useState } from "react";
// ---------- COMPONENTS ----------

// ---------- CONTEXT ----------

// ---------- HOOKS ----------
// ---------- HELPERS ----------
import axios from "axios";

import { isEmpty } from "lodash";
import { toast } from "react-hot-toast";
import Icon from "../../CustomUI/Icon";
import Field from "../../CustomUI/Field";
import { requestPatch, requestPost } from "../../../services/baseService";
import UserContext from "../../../context/UserContext";
import { NEXT_PUBLIC_API_URL } from "../../../constants/env";
import { Button } from "@chakra-ui/react";
// ---------- TYPES ----------
type EditProfileProps = { setVisibleProfile?: (x: any) => void };

const EditProfile = ({ setVisibleProfile }: EditProfileProps) => {
  // ---------- VARIABLES/IMPORTS ----------
  // ** ROUTER
  // ** CONTEXT
  const contextValue = useContext(UserContext) as any;
  // ---------- STATES ----------
  // ** FORM
  const [objectURL, setObjectURL] = useState<any>("");
  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [avatarId, setAvatarId] = useState<string>("");
  const [avatarPath, setAvatarPath] = useState<string>(
    "/images/avatars/avatar13.png"
  );

  // ** FORM ERROR
  const [phoneError, setPhoneError] = useState<string>("");

  // ---------- FUNCTIONS ----------
  function convertPhoneNumber(phoneNumber: any) {
    const regex = /^0(\d{9,12})$/;
    const match = phoneNumber?.match(regex);
    if (match) {
      const [, digits] = match;
      return `62${digits}`;
    }
    return phoneNumber;
  }

  const handlePhoneNumberChange = (inputValue: string) => {
    if (!/^\d*$/.test(inputValue)) {
      return;
    }

    if (!inputValue.startsWith("6")) {
      if (inputValue === "") {
      } else {
        setPhoneError("Please start with 62.");
        return;
      }
    }

    if (inputValue.length > 15) {
      setPhoneError("Phone number cannot be more than 15 characters.");
      return;
    }

    setPhone(inputValue);
  };

  const submitEditProfile = async ({ data }: any) => {
    const submit = { data, token: contextValue?.token };
    try {
      const responseData = await requestPatch<any>("/v1/users", submit);
      if (responseData?.statusCode === 200) {
        const newUserData = JSON.stringify(responseData.data);
        await axios.post(`/api/cookie/update?name=user&value=${newUserData}`);
        toast.success("Profile updated successfully!");
        setTimeout(() => {
          // router.reload();
        }, 3000);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message ?? "-";
      toast.error(`Edit Profile Error : ${errorMessage}`);
    }
  };

  const handleUpload = async (e: any) => {
    if (e.target.files === undefined) return;
    if (e.target.files[0] === undefined) return;

    let formData = new FormData();
    formData.append("file", e.target.files[0]);

    const submit = {
      data: formData,
      token: contextValue.token,
    };

    try {
      const responseData = await requestPost<any>("/v1/files", submit);
      if (responseData?.statusCode === 201) {
        const id = responseData?.data?.id;
        setAvatarId(id);
        setAvatarPath(`${NEXT_PUBLIC_API_URL}/v1/files/${id}`);
        toast.success("Upload successful, don't forget to save changes");
      } else {
        toast.error("Upload unsuccessfull, try again");
      }
    } catch (error) {
      console.error("handleUpload catch error --->", { error });
      toast.error("Upload unsuccessfull, try again");
    }
  };

  // ---------- EFFECTS ----------
  useEffect(() => {
    const a_id = contextValue?.user?.avatarId;
    const a_url = contextValue?.user?.avatarUrl;

    setName(contextValue?.user?.name);
    setMail(contextValue?.user?.email);
    setUsername(contextValue?.user?.username);
    setAvatarId(a_id);
    setAvatarPath(
      !isEmpty(a_id)
        ? `${NEXT_PUBLIC_API_URL}/v1/files/${a_id}`
        : !isEmpty(a_url)
        ? `${NEXT_PUBLIC_API_URL}/v1/files/${a_url}`
        : "/images/avatars/avatar13.png"
    );
    setPhone(convertPhoneNumber(contextValue?.user?.phone ?? ""));
    return () => {};
  }, [contextValue]);

  return (
    <form
      action=''
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const profileData = {
          name: formData.get("name"),
          username: formData.get("username"),
          phone: formData.get("phone"),
          email: mail,
          avatarId: avatarId,
        };
        submitEditProfile({ data: profileData });
      }}
    >
      <div className='mb-3 base2 font-semibold text-n-6'>Avatar</div>
      <div className='flex items-center mb-6'>
        <div className='relative flex justify-center items-center shrink-0 w-28 h-28 mr-4 rounded-full overflow-hidden bg-n-2'>
          {objectURL !== null ? (
            <img
              className='object-cover rounded-full'
              src={avatarPath}
              alt='Avatar'
            />
          ) : (
            <Icon className='w-8 h-8' name='profile' />
          )}
        </div>
        <div className='grow'>
          <div className='relative inline-flex mb-4'>
            <input
              className='absolute inset-0 opacity-0 cursor-pointer bg-n-3_hover border-transparent_hover '
              type='file'
              onChange={handleUpload}
            />
            <button className='btn-stroke-light bg-n-3_hover border-transparent_hover'>
              Upload new image
            </button>
          </div>
          <div className='caption1 text-n-4'>
            <p>At least 800x800 px recommended.</p>
            <p>JPG or PNG is allowed</p>
          </div>
        </div>
      </div>
      <button
        className='my-4 btn-stroke-light b-primary-1 bg-primary-1_hover border-transparent_hover text-white_hover w-full transition-opacity'
        onClick={() => {
          if (setVisibleProfile) {
            setVisibleProfile(false);
            // router.push("/pricing");
          }
        }}
      >
        Upgrade to Pro
      </button>
      <Field
        name='name'
        className='mb-6'
        label='Name'
        placeholder='Name'
        icon='profile-1'
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        required
      />
      <Field
        name='username'
        className='mb-6'
        label='Username'
        placeholder='Username'
        icon='profile-1'
        value={username}
        onChange={(e: any) => setUsername(e.target.value)}
        required
      />
      <Field
        name='email'
        className='mb-6'
        label='Email'
        placeholder='Email'
        icon='email'
        value={mail}
        onChange={(e: any) => setMail(e.target.value)}
        disabled
      />

      <Field
        name='phone'
        className='mb-6'
        label='Phone'
        placeholder='Phone'
        icon='phone'
        value={phone}
        onChange={(e: any) => {
          handlePhoneNumberChange(e?.target?.value);
        }}
        error={isEmpty(phoneError) ? false : phoneError}
        required
      />
      <button type='submit' className='btn-blue w-full m-0'>
        Save changes
      </button>
    </form>
  );
};

export default EditProfile;
