import { logInWithGoogle , useUser, logout } from "../Firebase/AuthService";

const Login = () => {

    const user = useUser();
    console.log({user});

    if(user)
    return (
        <div className="App">
            <h2>You are logged in as {user.displayName}</h2>
            <button onClick={logout}>Log me out</button>
        </div>
    )

    return (
        <div className="App">
            <h2>Please log in</h2>
            <button onClick={logInWithGoogle}>Login with big G</button>
        </div>
        );
}

export default Login;
