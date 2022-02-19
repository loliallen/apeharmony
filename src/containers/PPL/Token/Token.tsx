import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
} from "@material-ui/core";

import { StyledButton } from "../../StyledButton";
import { useAlert } from "../../../hooks/useAlert";
import { useAHMC } from "../../../hooks/useAHMC";
import { useStyles } from "./style";

type Props = {
  id: string;
  name: string;
  src: string;
  collection: string;
  registered: boolean;
  accamulated: number;
  claimed: number;
  spawned?: boolean;
  handleClaimOrRegister?: (
    collection: string,
    tokenId: string,
    isRegistered?: boolean
  ) => void;
  handleTransfer?: Function;
  isOwner?: boolean
};
export const Token = ({
  handleClaimOrRegister,
  handleTransfer,
  ...token
}: Props) => {
  const { id, name, src, collection, registered, accamulated, claimed } = token;
  const classes = useStyles();
  const { createSign, getTokens } = useAHMC();
  const { openAlert } = useAlert();

  const handleSendTID = async () => {
    try {
      let sign  = await createSign(token.id)
      let res = await fetch("https://apeharmony.com/signed.php", {
        method: "POST",
        body: JSON.stringify(sign),
      });
      if (res.ok) {
        openAlert && openAlert("Spawn successful! Please allow time to update metadata", "success");
        setTimeout(()=>{
          getTokens()
        }, 1000)
      }
      else openAlert && openAlert("Something goes wrong", "warning");
    } catch (e) {
      console.error(typeof e)
      if (e instanceof Error) openAlert && openAlert(e.message, "error");
      else openAlert && openAlert("RPC error", "error");
    }
  };
  return (
    <Card
      className={classes.card}
    >
      <CardHeader
        title={name}
        action={
          (token.collection === "ahmc" && !token.spawned && token.isOwner) && (
            <StyledButton
              onClick={handleSendTID}
              color="primary"
            >
              SPAWN
            </StyledButton>
          )
        }
      />
      <CardMedia
        className={classes.card_media}
        image={src}
      />
      <CardContent>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">
              Accumulated:
            </Typography>
            <Typography variant="h6">
              {accamulated} $PPL
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">
              Claimed:
            </Typography>
            <Typography variant="h6">
              {claimed} $PPL
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions style={{ justifyContent: "space-between" }}>
        {handleClaimOrRegister && (
          <StyledButton
            onClick={() => handleClaimOrRegister(collection, id, registered)}
            size="large"
            variant="contained"
          >
            {collection === "artw"
              ? !registered
                ? "Register"
                : "Claim"
              : "Claim"}
          </StyledButton>
        )}

        {handleTransfer && (
          <StyledButton
            disabled={token.claimed === 0}
            onClick={() => handleTransfer(collection, token)}
            size="large"
            variant="contained"
          >
            Transfer
          </StyledButton>
        )}
      </CardActions>
    </Card>
  );
};

/**
 *
 * <Card sx={{
                                        width: "450px",
                                        [t.breakpoints.down('sm')]: {
                                            width: "300px",
                                        }
                                    }}>
                                        <CardHeader title={token.name} titleTypographyProps={{ color: "white" }} />
                                        <CardMedia
                                            sx={{
                                                height: "350px",
                                                [t.breakpoints.down('sm')]: {
                                                    height: "250px",
                                                }
                                            }}
                                            image={token.src}
                                        />
                                        <CardContent>
                                            <Box>
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                >
                                                    <Typography variant="h6" color="white">
                                                        Accumulated:
                                                    </Typography>
                                                    <Typography variant="h6" color="white">
                                                        {(token.collection === "artw" && !token.registered) ? 0 : token.accamulated} $PPL
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                >
                                                    <Typography variant="h6" color="white">
                                                        Claimed:
                                                    </Typography>
                                                    <Typography variant="h6" color="white">
                                                        {token.claimed} $PPL
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: "space-between" }}>
                                            <StyledButton
                                                onClick={() => handleClaimOrRegister(token.collection, token.id, token.registered)}
                                                size="large"
                                                variant="contained"
                                                disabled={token.claimed > 0}>
                                                {token.collection === "artw" ? !token.registered ? "Register" : "Claim" : "Claim"}
                                            </StyledButton>

                                            <StyledButton disabled={token.claimed === 0} onClick={() => handleTransfer(token.collection, token)} size="large" variant="contained">Transfer</StyledButton>
                                        </CardActions>
                                    </Card>
 */
