import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Grid, GridItem } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Switch } from "@chakra-ui/switch";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UserContext from "../../../context/UserContext";
import { setShowWelcome } from "../../../slices/showWelcomeSlice";

type PreferencesProps = {};

const Preferences = ({}: PreferencesProps) => {
  const contextValue = useContext(UserContext);
  const dispatch = useDispatch();
  const showWelcome = useSelector(
    (state: any) => state.showWelcome.showWelcome
  );

  return (
    <div>
      <Grid templateColumns='repeat(4, 1fr)' gap={6} alignItems='center'>
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
      </Grid>
    </div>
  );
};

export default Preferences;
