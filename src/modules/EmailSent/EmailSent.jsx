import React from "react";

import photo from "../../assets/images/email-sent.jpg";
import { PageWrapper, BackgroundImage } from "../../components";
import { consume } from "../../context";
import { Paper, Typography } from "@material-ui/core";

const styles = theme => ({
    img: {
        width: "100%",
        flex: "1 auto",
        maxWidth: 1920,
        maxHeight: 1024,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    plane: {
        maxWidth: 680,
        width: "80%",
        backgroundColor: "rgba(255,255,255,.5)",
        padding: theme.spacing.unit * 2,
        textAlign: "center"
    }
});

const EmailSent = ({ t, children, classes }) => (
    <PageWrapper>
        <BackgroundImage src={photo} className={classes.img}>
            <Paper className={classes.plane}>
                <Typography variant="h2" style={{ marginBottom: 8 }}>
                    {t("Check your Email")}
                </Typography>
                <Typography
                    variant="subtitle1"
                    style={{ whiteSpace: "pre-wrap" }}
                >
                    {children}
                </Typography>
            </Paper>
        </BackgroundImage>
    </PageWrapper>
);

export default consume({ store: false, styles })(EmailSent);
