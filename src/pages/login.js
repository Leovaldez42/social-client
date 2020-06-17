import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Logo from '../images/vjti.jpeg'
import { Link } from 'react-router-dom'
// MUI STUFF
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography' 
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userAction'

// Styling taken from util/theme
const styles = theme => ({
    ...theme.spreadThis
  });    

// This is the login component.
class login extends Component {
    // It shall give the initial state as all empty and then it shall check the detials given by the user ( which is handled by the server side ) and give the necessary errors.
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, UI: {loading} } = this.props;
        const { errors } = this.state
        return (
            <div>
                <Grid container className={classes.form}>
                    <Grid item sm />
                    <Grid item sm>
                        <img src={Logo} alt='vjti-logo' className={classes.image}/>
                        <Typography variant="h2" className={classes.pageTitle}>
                            Login
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField id="email" name="email" type="email" label="Email" className={classes.textField} helperText={errors.email} error={errors.email ? true : false} value={this.state.email} onChange={this.handleChange} fullWidth />
                            <TextField id="password" name="password" type="password" label="Password" className={classes.textField} helperText={errors.password} error={errors.password ? true : false} value={this.state.password} onChange={this.handleChange} fullWidth />
                            {errors.general && (<Typography variant="body2" className={classes.customError}>{errors.general}</Typography>)}
                            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}> Login {loading &&(<CircularProgress size={30} className={classes.progress}/>)}</Button>
                            <br />
                            <small>Don't have account ? Sign up here < Link to="/signup">here</Link></small><br /><br /><br /><br /><br /><br /><br />
                        </form>
                    </Grid>
                    <Grid item sm />
                </Grid>
            </div>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.func.isRequired,
    UI: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(login))
