const crypto = require('crypto');

const generateOtp=() =>{
    const rawOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOtp=crypto.createHash('sha256').update(rawOtp).digest('hex');
    return {rawOtp, hashedOtp};
};

module.exports = generateOtp;