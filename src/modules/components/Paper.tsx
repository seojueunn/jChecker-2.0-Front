import { capitalize, Theme, withStyles } from "@material-ui/core";
import MuiPaper from '@material-ui/core/Paper';
import clsx from "clsx";
import PropTypes from 'prop-types';

const styles = (theme: Theme) => ({
    backgroundLight: {
        backgroundColor: theme.palette.secondary.light,
    },
    backgroundMain: {
        backgroundColor: theme.palette.secondary.main,
    },
    backgroundDark: {
        backgroundColor: theme.palette.secondary.dark,
    },
    padding: {
        padding: theme.spacing(1),
    },
});


function Paper(props: any) {
    const { background = 'light', classes, className, padding = false, ...other } = props;
    return (
        <MuiPaper
            elevation={0}
            square
            className={clsx(
                classes[`background${capitalize(background)}`],
            {
                [classes.padding]: padding,
            },
            className,
            )}
            {...other}
        />
    );
}


Paper.propTypes = {
    background: PropTypes.oneOf(['light', 'main', 'dark']),
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    padding: PropTypes.bool,
};


export default withStyles(styles)(Paper);