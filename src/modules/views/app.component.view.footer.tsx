import { Container, Grid, Link, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import Typograhpic from '../components/app.component.typography';


function Copyright() {
    return (
        <React.Fragment>
            {'ⓒ '}
            <Link color="inherit" href="https://isel.handong.edu/">
                ISEL Lab in Handong Global University.
            </Link>{' '}
            {new Date().getFullYear()}
        </React.Fragment>
    );
}


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.secondary.light,
    },
    container: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
    },
    iconsWrapper: {
        height: 60,
    },
    iconsWrapperSecondary: {
        height: 80,
        marginBottom: theme.spacing(1),
    },
    icons: {
        width: 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(1),
    },
    labIcons: {
        width: 70,
        height: 74,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(1),
    },
    backgroundIcons: {
        width: 200,
        height: 76,
        display: 'flex',
        justifyContent: 'center',
    },
    list: {
        margin: 0,
        listStyle: 'none',
        padding: 0,
    },
    listItem: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
}));



export default function AppFooter() {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container spacing={1}>
                <Grid item>
                    <Grid
                        container
                        direction='row'
                        justify="flex-start"
                        className={classes.iconsWrapperSecondary}
                    >
                        <Grid item className={classes.backgroundIcons}>
                            <img src="/static/hand.png" alt="Handong" className={classes.backgroundIcons}/>
                        </Grid>
                        <Grid item className={classes.backgroundIcons}>
                            <img src="/static/ISEL-t.png" alt="ISEL" className={classes.labIcons}/>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction='row'
                        justify="flex-start"
                        className={classes.iconsWrapper}
                        spacing={2}
                    >
                        <Grid item className={classes.icons}>
                           <a href="https://github.com/newForinux" className={classes.icons}>
                               <img src="/static/github.svg" alt="Github" />
                           </a>
                        </Grid>
                        <Grid item className={classes.icons}>
                           <a href="https://github.com/Yessir-kim" className={classes.icons}>
                               <img src="/static/github.svg" alt="Github" />
                           </a>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Copyright />
                    </Grid>
                </Grid>
                
                <Grid item>
                    <Typograhpic variant="caption" gutterBottom>
                        {'Icons made by'}
                        <Link href="https://www.freepik.com" rel="sponsered" title="Freepik">
                            Freepik
                        </Link>
                        {' from '}
                        <Link href="https://www.flaticon.com" rel="sponsered" title="Flaticon">
                            www.flaticon.com
                        </Link>
                        {' is licensed by '}
                        <Link href="https://creativecommons.org/licenses/by/3.0" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">
                            CC 3.0 BY
                        </Link>
                    </Typograhpic>
                </Grid>
            </Grid>
        </Container>
    )
}