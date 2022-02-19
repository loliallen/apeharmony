import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    Theme,
    Typography,
    makeStyles
} from "@material-ui/core";
import React from "react";
import {IAuthor} from "./interfaces";

const useStyles = makeStyles<Theme, { author?: boolean }>(
    (t) => ({
        card: {
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "2rem",
            width: (p) => (p.author ? 700 : 350),
            backgroundColor: "transparent",
            color: "white",
            [t.breakpoints.down("sm")]: {
                width: (p) => (p.author ? 275 : 300),
            },
        },
        card_typography: {
            lineHeight: 1,
            minHeight: (p) => (p.author ? "max-content" : "5rem"),
            [t.breakpoints.down("sm")]: {
                minHeight: "2rem",
            },
        },
        media: {
            height: (p) => (p.author ? 475 : 350),
            border: "none",
            backgroundSize: "contain",
            [t.breakpoints.down("sm")]: {
                height: (p) => (p.author ? 300 : 250),
            },
        },

        linked_media: {
            height: 350,
            border: "none",
            backgroundSize: "contain",
        },
    }),
    {name: "AuthorStyles"}
);

type Props = IAuthor;
export const Author: React.FC<Props & { author?: boolean }> = ({
                                                                   nickname,
                                                                   avatar,
                                                                   description,
                                                                   twitter_link,
                                                                   children,
                                                                   author,
                                                               }) => {
    const classes = useStyles({author});
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardHeader
                    title={nickname}
                    titleTypographyProps={{
                        variant: "h6",
                        align: "center",
                        className: classes.card_typography,
                    }}
                />
                {twitter_link ? (
                    <a href={twitter_link} target="_blank" rel="noreferrer">
                        <CardMedia className={classes.media} image={avatar}/>
                    </a>
                ) : (
                    <CardMedia className={classes.media} image={avatar}/>
                )}
                {(description || children) && (
                    <CardContent>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            style={{lineHeight: 1.1}}
                        >
                            <div dangerouslySetInnerHTML={{__html: description}}/>
                        </Typography>
                        {children}
                    </CardContent>
                )}
            </Card>
        </Grid>
    );
};
