var sha256 = require('js-sha256').sha256;

var key = ''; // put here the key
var laUrl = 'https://app.liquidaccess.com';
var time = Math.round(new Date().getTime() / 1000);

/* *** init data */

var expiration_date = time + 86400 * 30 * 3;
var merchant_id = 1;
var timestamp = time;
var subscription_id = `FAKE-${time}`;
var user_id = `testuser-${time}`;
var smart_contract_prefix = 'premium';

/* *** utils */

// sort arguments, filter empty and stringify the object

function normalizeData(data) {
    return Object.keys(data)
        .sort()
        .reduce((result, key) => {
            const value = data[key];

            if (value) {
                result.push(`${key}=${value}`);
            }

            return result;
        }, [])
        .join('&');
}

/* *** mint */

var mintLine = normalizeData({
    expiration_date,
    merchant_id,
    timestamp,
    user_id,
    subscription_id,
    smart_contract_prefix,
});
var mintSignature = sha256.hmac(key, mintLine);

var mintLink = `${laUrl}/mint?` +
    `smart_contract_prefix=${smart_contract_prefix}&` +
    `user_id=${user_id}&` +
    `subscription_id=${subscription_id}&` +
    `expiration_date=${expiration_date}&` +
    `merchant_id=${merchant_id}&` +
    `timestamp=${timestamp}&` +
    `signature=${mintSignature}`;

console.log('URL for minting:', mintLink);

/* *** activate */

var activateLine = normalizeData({
    merchant_id,
    timestamp,
    user_id,
});
var activateSignature = sha256.hmac(key, activateLine);

var activateLink = `${laUrl}/activate?` +
    `user_id=${user_id}&` +
    `expiration_date=${expiration_date}&` +
    `merchant_id=${merchant_id}&` +
    `timestamp=${timestamp}&` +
    `signature=${activateSignature}`;

console.log('URL for activation:', activateLink);
