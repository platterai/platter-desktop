import { useState } from "react";
import Menu from "./Menu";
import Logout from "./Logout";
import Preferences from "./Preferences";

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
          {active.id === "preferences" && <Preferences />}
          {active.id === "logout" && <Logout />}
        </div>
      </div>
    </div>
  );
}
