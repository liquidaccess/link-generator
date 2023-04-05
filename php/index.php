<?php

$key = ''; // put here the key
$laUrl = 'https://app.liquidaccess.com';
$time = time();

// init data

$expiration_date = $time + 86400 * 30 * 3;
$merchant_id = 1;
$timestamp = $time;
$subscription_id = "FAKE-${time}";
$user_id = "testuser-${time}";
$smart_contract_prefix = 'premium';

// sort arguments, filter empty and stringify the object

function normalizeData(array $data) {
    ksort($data);
    $data = array_filter($data);
    $result = [];
    foreach ($data as $key => $value) {
        $result[] = "${key}=${value}";
    }

    return implode('&', $result);
}

// ---------------------- mint

$mintLine = normalizeData([
    'expiration_date' => $expiration_date,
    'merchant_id' => $merchant_id,
    'timestamp' => $timestamp,
    'user_id' => $user_id,
    'subscription_id' => $subscription_id,
    'smart_contract_prefix' => $smart_contract_prefix,
]);

$mintSignature = hash_hmac('sha256', $mintLine, $key);

$mintLink = "${laUrl}/mint?" .
    "smart_contract_prefix=${smart_contract_prefix}&" .
    "user_id=${user_id}&" .
    "subscription_id=${subscription_id}&" .
    "expiration_date=${expiration_date}&" .
    "merchant_id=${merchant_id}&" .
    "timestamp=${timestamp}&" .
    "signature=${mintSignature}";

var_dump('URL for minting:', $mintLink);

// ---------------------- activate

$activateLine = normalizeData([
    'merchant_id' => $merchant_id,
    'timestamp' => $timestamp,
    'user_id' => $user_id,
]);

$activateSignature = hash_hmac('sha256', $activateLine, $key);

$activateLink = "${laUrl}/activate?" .
    "user_id=${user_id}&" .
    "expiration_date=${expiration_date}&" .
    "merchant_id=${merchant_id}&" .
    "timestamp=${timestamp}&" .
    "signature=${activateSignature}";

var_dump('URL for activation:', $activateLink);