import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = () => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formTitle: {
        alignSelf: 'flex-start',
        marginTop: '12px'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '400px'
    },
    visibilityBtn: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    inputMargin: {
        marginBottom: '20px'
    },
    errorMsg: {
        position: 'relative',
        top: '-20px',
        color: 'red',
    },
    errorColor: {
        color: 'red'
    },
    btnContainer: {
        alignSelf: 'flex-end',
        marginBottom: '20px'
    },
    submitBtn: {
        background: '#76BF44',
        color: 'white',
        padding: '10px 30px',
        '&:hover': {
            backgroundColor: '#76BF44'
        }
    }
});

class ResetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            password: '',
            passwordConfirmation: '',
            showPassword: false,
            showPasswordConf: false,
            invalidPass: '',
            invalidConfirm: '',
            someState: null,
        }
    }

    componentDidMount = () => {
        this.setState({ token: this.props.match.params.token })
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleClickShowPassword = name => {
        this.setState(state => ({ [name]: !state[name] }));
    };

    validatePassword = () => {
        const { password, passwordConfirmation } = this.state;
        const lower = /[a-z]/;
        const upper  =/[A-Z]/;
        const number = /[0-9]/;

        if (password.length < 6) {
            this.setState({ invalidPass: 'Please, make sure password is at least 6 characters long.'})
            return false;
        }
        if (!lower.test(password)) {
            this.setState({ invalidPass: 'Please, make sure password includes a lowercase letter.'})
            return false;
        }
        if (!number.test(password)) {
            this.setState({ invalidPass: 'Please, make sure password includes a digit.'})
            return false;
        }
        if (!upper.test(password)) {
            this.setState({ invalidPass: 'Please, make sure password includes an uppercase letter.'})
            return false;
        }
        if (password !== passwordConfirmation) {
            this.setState({ invalidPass: '', invalidConfirm: 'Please, make sure password confirmation matches password.'})
            return false;
        }
        this.setState({ invalidPass: '', invalidConfirm: '' });
        return true;
    }

    handleSubmit = () => {
        const isValid = this.validatePassword();
        if (isValid) {
            this.patchPassword('/v1/authentication/reset_password');
        } else return
    }

    patchPassword = url => {
        axios.patch(`${url}`, {
            token: this.state.token,
            password: this.state.password,
        })
        .then(() => {
            this.props.handleResetResult(1);
        })
        .catch(() => {
            this.props.handleResetResult(2);
        });
    }
        
    render() {
        const { state } = this
        const { classes } = this.props
        if (this.props.result) {
            return <Redirect to={"/finish"} />;
        }
        return(
            <Card className={classes.wrapper}>
                <CardHeader className={classes.formTitle} title="Create a new password" />
                <CardContent className={classes.inputContainer}>
                    <FormControl>
                        <InputLabel
                            htmlFor="password"
                            className={state.invalidPass !== '' ? classes.errorColor : ''}
                        >
                            Password
                        </InputLabel>
                        <Input
                            id="password"
                            className={classes.inputMargin}
                            type={state.showPassword ? 'text' : 'password'}
                            value={state.password}
                            onChange={this.handleChange}
                            error={state.invalidPass !== ''}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    className={classes.visibilityBtn}
                                    aria-label="Toggle password visibility"
                                    onClick={() => this.handleClickShowPassword('showPassword')}
                                    style={{ }}
                                >
                                    {!state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        <FormHelperText className={classes.errorMsg}>{ state.invalidPass }</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel
                            htmlFor="passwordConfirmation"
                            className={state.invalidConfirm !== '' ? classes.errorColor : ''}
                        >
                            Password Confirmation
                        </InputLabel>
                        <Input
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            className={classes.inputMargin}
                            type={state.showPasswordConf ? 'text' : 'password'}
                            value={state.passwordConfirmation}
                            onChange={this.handleChange}
                            error={state.invalidConfirm !== ''}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    className={classes.visibilityBtn}
                                    aria-label="Toggle password confirmation visibility"
                                    onClick={() => this.handleClickShowPassword('showPasswordConf')}
                                >
                                    {!state.showPasswordConf ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        <FormHelperText className={classes.errorMsg}>{ state.invalidConfirm }</FormHelperText>
                    </FormControl>
                </CardContent>
                <CardActions className={classes.btnContainer}>
                    <Button
                        onClick={this.handleSubmit}
                        size="small"
                        className={classes.submitBtn}
                    >
                        Submit
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(ResetPage);
