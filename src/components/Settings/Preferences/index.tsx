import { Grid, GridItem } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { setShowWelcome } from "../../../redux/slices/showWelcomeSlice";

type PreferencesProps = {};

const Preferences = ({}: PreferencesProps) => {
  const dispatch = useDispatch();
  const showWelcome = useSelector(
    (state: any) => state.showWelcome.showWelcome
  );

  const [colormode, setColormode, deleteColormode] =
    useLocalStorage<string>("colormode");

  useEffect(() => {
    console.log({ colormode });
    return () => {};
  }, [colormode]);

  return (
    <div>
      <Grid templateColumns='repeat(4, 1fr)' gap={6} alignItems='center'>
        {/* ============== Show welcome and hint */}
        <GridItem w='100%' colSpan={3}>
          <p>Show welcome and hint</p>
        </GridItem>
        <GridItem w='100%' colSpan={1}>
          <Select
            variant='unstyled'
            value={showWelcome}
            sx={{
              border: "1px solid var(--n-3) !important",
              padding: "8px 16px",
            }}
            _focus={{
              border: "1px solid var(--n-4) !important",
            }}
            _active={{
              border: "1px solid var(--n-4) !important",
            }}
            onChange={(e) => {
              switch (e.target.value) {
                case "true":
                  dispatch(setShowWelcome(Boolean(true)));
                  break;

                case "false":
                  dispatch(setShowWelcome(Boolean(false)));
                  break;

                default:
                  dispatch(setShowWelcome(Boolean(true)));
                  break;
              }
            }}
          >
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </Select>
        </GridItem>

        {/* ============== Appearance */}
        <GridItem w='100%' colSpan={3}>
          <p>Appearance</p>
        </GridItem>
        <GridItem w='100%' colSpan={1}>
          <Select
            variant='unstyled'
            value={isEmpty(colormode) ? "light" : colormode}
            sx={{
              border: "1px solid var(--n-3) !important",
              padding: "8px 16px",
            }}
            _focus={{
              border: "1px solid var(--n-4) !important",
            }}
            _active={{
              border: "1px solid var(--n-4) !important",
            }}
            onChange={(e) => {
              console.log(`e.target.value`, { value: e.target.value });
              setColormode(e.target.value);
            }}
          >
            <option value='light'>Light</option>
            <option value='dark'>Dark</option>
          </Select>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Preferences;
