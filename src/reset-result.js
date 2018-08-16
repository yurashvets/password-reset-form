import React from 'react';
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

const styles = () => ({
    wrapper: {
        display: 'flex',
        height: '300px'
    },
    successColor: {
        color: '#8bc165'
    },
    failColor: {
        color: '#ce4444'
    }
})

const ResetResult = props => {
    const { classes } = props;
    if (!props.result) {
        return <Redirect to="/" />
    }
    return(
        <Card className={classes.wrapper}>
            <CardHeader
                classes={{title: props.result > 55 ? classes.successColor : classes.failColor}}
                title={`${props.result > 55 ?
                'Awesome, password has been changed successfully' :
                'Oooops, something went wrong, please try again'}`}
            />
        </Card>
    );
}

export default withStyles(styles)(ResetResult);
