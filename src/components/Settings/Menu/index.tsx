import Icon from "../../CustomUI/Icon";

type MenuProps = {
  buttons: any;
  value: any;
  setValue: any;
};

const Menu = ({ buttons, value, setValue }: MenuProps) => {
  const handleClick = (value: any) => {
    setValue(value);
  };

  return buttons.map((button: any, index: number) => (
    <div className='mb-1' key={index}>
      <button
        className={`group flex items-center w-full px-3.5 py-1.5 rounded-full border-2 border-transparent base2 font-semibold transition-colors hover:bg-n-2 tap-highlight-color dark:hover:bg-n-6 dark:hover:text-n-1 text-n-4 ${
          value === button &&
          "!border-primary-1 text-n-7 !bg-n-1 dark:!bg-transparent dark:text-n-1"
        }`}
        onClick={() => handleClick(button)}
      >
        <Icon
          className={`w-4 h-4 mr-3 transition-colors ${
            button.id === "delete-account"
              ? `!fill-accent-1`
              : `fill-n-4 ${
                  value === button &&
                  "fill-n-7 dark:fill-n-1 dark:group-hover:fill-n-1"
                }`
          }`}
          name={button.icon}
        />
        {button.title}
      </button>
    </div>
  ));
};

export default Menu;
