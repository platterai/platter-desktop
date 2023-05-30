import { useState } from "react";
import Menu from "./Menu";
import Password from "./Password";
import Team from "./Team";
import DeleteAccount from "./DeleteAccount";
import Logout from "./Logout";
import EditProfile from "../Profile/EditProfile";

type SettingsType = {
  id: string;
  title: string;
  icon: string;
};

type SettingsProps = {
  items: SettingsType[];
  activeItem?: number;
};

export default function Settings({ items, activeItem }: SettingsProps) {
  const [active, setActive] = useState<any>(items[activeItem || 0]);

  return (
    <div className='settingsWrapper'>
      <div className='settingsInnerWrapper'>
        <div className='settingsMenuWrapper'>
          <Menu value={active} setValue={setActive} buttons={items} />
        </div>
        <div className='settingsContentWrapper no-scrollbar'>
          {active.id === "edit-profile" && <EditProfile />}
          {active.id === "password" && <Password />}
          {active.id === "team" && <Team />}
          {active.id === "logout" && <Logout />}
        </div>
      </div>
    </div>
  );
}
