import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  useTheme,
  Box,
} from "@mui/material";

import { StyledButton } from "../StyledButton";
import { useETH } from "../../hooks/useETH";
import { useAlert } from "../../hooks/useAlert";
import { useAHMC } from "../../hooks/useAHMC";

type Props = {
  id: string;
  name: string;
  src: string;
  collection: string;
  registered: boolean;
  accamulated: number;
  claimed: number;
  handleClaimOrRegister?: (
    collection: string,
    tokenId: string,
    isRegistered?: boolean
  ) => void;
  handleTransfer?: Function;
};
export const Token = ({
  handleClaimOrRegister,
  handleTransfer,
  ...token
}: Props) => {
  const { id, name, src, collection, registered, accamulated, claimed } = token;
  const t = useTheme();
  const { account } = useETH();
  const { createSign } = useAHMC();
  const { openAlert } = useAlert();

  const handleSendTID = async () => {
    try {
      let sign  = await createSign(token.id)
      let res = await fetch("/spawn.php", {
        method: "POST",
        body: JSON.stringify({
          account,
          tid: token.id,
          date: sign
        }),
      });
      if (res.ok) {
        openAlert && openAlert("Spawn successful! Please allow time to update metadata", "success");
        localStorage.setItem(token.id, 'used')
      }
      else openAlert && openAlert("Something goes wrong", "warning");
    } catch (e) {
      if (e instanceof Error) openAlert && openAlert(e.message, "error");
    }
  };
  return (
    <Card
      sx={{
        width: "450px",
        [t.breakpoints.down("sm")]: {
          width: "300px",
        },
      }}
    >
      <CardHeader
        title={name}
        titleTypographyProps={{ color: "white" }}
        action={
          collection === "ahmc" && (
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
        sx={{
          height: "350px",
          [t.breakpoints.down("sm")]: {
            height: "250px",
          },
        }}
        image={src}
      />
      <CardContent>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" color="white">
              Accumulated:
            </Typography>
            <Typography variant="h6" color="white">
              {accamulated} $PPL
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" color="white">
              Claimed:
            </Typography>
            <Typography variant="h6" color="white">
              {claimed} $PPL
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
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
