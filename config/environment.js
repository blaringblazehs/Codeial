const development = {
    name: "development",
    asset_path: "./assets",
    session_cookie_key: "abcsomething",
    db: "codeial_development",
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "g.himanshuss@gmail.com",
            pass: "blaringblaze4hs",
        },
    },
    google_client_id:
        "562587631083-o8td68lsfgbf2gjvbfbkesocne8bg6k5.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: "codeial",
};
const production = {
    name: "production",
};
module.exports = development;
