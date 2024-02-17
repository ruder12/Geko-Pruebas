import "../assets/styleLogin.css"

const FormLogin = () => {
    return (
        <>
            <form className='login-form'>
                <div className="flex-row">
                    <input id="username" className='lf--input' placeholder='Username' type='text' />
                </div>
                <div className="flex-row">
                   
                    <input id="password" className='lf--input' placeholder='Password' type='password' />
                </div>
                <input className='lf--submit' type='submit' value='LOGIN' />
            </form>
        
        </>
    );
}

export default FormLogin;