const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // Options for cookies (development)
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: false, // false for localhost, true for production with HTTPS
        sameSite: "Lax",
        path: "/"
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token: token,
        user: user
    });
}

module.exports = sendToken;