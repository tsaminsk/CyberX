<?php

$recepient = "tsa@tut.by";
$sitename = "CyberX";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);
$text = trim($_POST["text"]);
$message = "Получена заявка от потенциального клиента.\nТема заявки: $text \nИмя: $name \nТелефон: $phone \nE-mail: $email";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");