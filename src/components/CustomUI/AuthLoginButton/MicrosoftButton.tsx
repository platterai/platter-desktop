import { handleGoogleOauth } from "../../../services/apiHandlers";
import { btn_stroke_light } from "../../../styles/custom-components-classes";

type MicrosoftButtonProps = {};

export default function MicrosoftButton({}: MicrosoftButtonProps) {
  return (
    <button className={`${btn_stroke_light}`} onClick={handleGoogleOauth}>
      <img src='/images/google.svg' width={24} height={24} alt='google' />
      <p className=''>Continue with Google</p>
    </button>
  );
}
