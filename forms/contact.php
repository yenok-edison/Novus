<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

  $name = htmlspecialchars($_POST["name"]);
  $email = htmlspecialchars($_POST["email"]);
  $subject = htmlspecialchars($_POST["subject"]);
  $message = htmlspecialchars($_POST["message"]);

  $to = "soniya@iktaraa.com";
  $headers = "From: $email\r\nReply-To: $email";
  $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

  if (mail($to, $subject, $body, $headers)) {
    echo "OK";
  } else {
    echo "ERROR";
  }
}
