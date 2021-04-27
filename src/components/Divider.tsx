import React from 'react';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    divider: {
        width: '50%',
        height: '2px',
        backgroundColor: theme.palette.primary.main,
        margin: '0 auto'
    }
}))

const Divider = () => {
    const classes = useStyles()
    return (
        <div className={classes.divider}></div>
    )
}

export default Divider;