const axios = require('axios')

let sendotp = async(mobile) => {
    let random = Math.floor(100000 + Math.random() * 900000);
    let url = `https://2factor.in/API/V1/${process.env.FactorAPIKey}/SMS/${mobile}/${random}/otp%20with%20hash`
    let response = await axios.get(url)
    if (response.status == 200) {
        return {
                status: true,
                otp: random,
                msg: "OTP Send Successfully",
        };
    }
    else {
        console.log(response)
        return {
                status: false,
                msg: "OTP sending Error",
                otp: null
            };
    }
}

module.exports = sendotp;