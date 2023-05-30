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
        className={`flex items-center w-full px-3 py-1 rounded-full border-2 border-transparent base2 font-semibold transition-colors bg-n-2_hover tap-highlight-color text-n-4 ${
          value === button && "border-primary-1 text-n-7 bg-n-1"
        }`}
        onClick={() => handleClick(button)}
      >
        <Icon
          className={`mr-3 transition-colors fill-n-4 ${
            value === button && "fill-n-7"
          } w-4 h-4`}
          name={button.icon}
        />
        {button.title}
      </button>
    </div>
  ));
};

export default Menu;
