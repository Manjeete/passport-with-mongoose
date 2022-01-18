const axios = require('axios')

let sendotp = async(mobile) => {
    let random = Math.floor(100000 + Math.random() * 900000);
    // let sender = {
    //     url:
    //         "http://2factor.in/API/V1/" +
    //         apiKey +
    //         "/ADDON_SERVICES/SEND/TSMS",
    //     form: {
    //         From: "FLEEKS",
    //         To: mobile,
    //         TemplateName: "new otp template with hash",
    //         VAR1: random,
    //         VAR2:"D1meVFKTFvT"
    //     },
    // };
    // let response = await axios.post(sender.url, sender.form);

    let url = `https://2factor.in/API/V1/${process.env.FactorAPIKey}/SMS/${mobile}/${random}/otp%20with%20hash`
    let response = await axios.get(url)
    // console.log(response)
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