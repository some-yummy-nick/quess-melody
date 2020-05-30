import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Operation} from "../../operations";

class AuthorizationScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    handleSubmit = e => {
        const {onSubmit} = this.props;

        e.preventDefault();
        onSubmit({
            email: this.emailRef.current.value,
            password: this.passwordRef.current.value,
        });
    };

    render() {
        return <section className="login">
            <div className="login__logo">
                <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
            </div>
            <h2 className="login__title">Необходима авторизация</h2>
            <p className="login__text">Представьтесь!</p>
            <form className="login__form" action="" method="POST" onSubmit={this.handleSubmit}>
                <p className="login__field">
                    <label className="login__label" htmlFor="name">Логин</label>
                    <input className="login__input" type="text" name="email" id="email" defaultValue="some@gmail.com"
                           ref={this.emailRef}/>
                </p>
                <p className="login__field">
                    <label className="login__label" htmlFor="password">Пароль</label>
                    <input className="login__input" type="text" name="password" id="password" defaultValue="some"
                           ref={this.passwordRef}/>
                    <span className="login__error">Неверный пароль</span>
                </p>
                <button className="login__button button" type="submit">Войти</button>
            </form>
        </section>;
    }
}

export {AuthorizationScreen};

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (authData) => {
        dispatch(Operation.login(authData));
    }
});


export default connect(
    null,
    mapDispatchToProps
)(AuthorizationScreen);
