<?php

$recepient = "tsa@tut.by";
$sitename = "CyberX";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);
$sity = trim($_POST["sity"]);
$message = "Получена анкета потенциального партнёра: \nИмя: $name \nТелефон: $phone \nE-mail: $email \nГород: $sity";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");