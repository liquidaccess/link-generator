var sha256 = require('js-sha256').sha256;

var key = ''; // put here the key
var laUrl = 'https://liquidaccess.com'
var time = Math.round(new Date().getTime() / 1000);

/* *** init data */

var expiration_date = time + 86400 * 30 * 3;
var merchant_id = 1;
// You can pass subscription_id if you want. But in this case this subscription_id will be sent in webhooks and your API should process it properly
// Uncomment the subscription_id mentions in the rest of the code as well
// var subscription_id = `FAKE-${time}`;
var timestamp = time;
var user_id = `testuser-${time}`;

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
    // subscription_id,
});
var mintSignature = sha256.hmac(key, mintLine);

var mintLink = `${laUrl}/mint?user_id=${user_id}&expiration_date=${expiration_date}&merchant_id=${merchant_id}&timestamp=${timestamp}&signature=${mintSignature}`;
// var mintLink = `${laUrl}/mint?user_id=${user_id}&subscription_id=${subscription_id}&expiration_date=${expiration_date}&merchant_id=${merchant_id}&timestamp=${timestamp}&signature=${mintSignature}`;

console.log('URL for minting:', mintLink);
// https://uat.liquid-access.rocks/mint?user_id=mb@liquidaccess.com&subscription_id=1&expiration_date=1665240000&merchant_id=1&timestamp=1665140000&signature=632145ef71d2f795be0f43acd18422141a1a8feca30791d0ad693234979eb484

/* *** activate */

var activateLine = normalizeData({
    merchant_id,
    timestamp,
    user_id,
});
var activateSignature = sha256.hmac(key, activateLine);

var activateLink = `${laUrl}/activate?user_id=${user_id}&expiration_date=${expiration_date}&merchant_id=${merchant_id}&timestamp=${timestamp}&signature=${activateSignature}`;

console.log('URL for activation:', activateLink);
// https://uat.liquid-access.rocks/activate?user_id=mb@liquidaccess.com&expiration_date=1665240000&merchant_id=1&timestamp=1665140000&signature=4ee5b393228fe7f16e10ccdc43b303d02a9cdd97612c971ac39fff4049858d22