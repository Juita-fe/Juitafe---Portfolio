<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = strip_tags(trim($_POST["email"]));
    $message = strip_tags(trim($_POST["message"]));

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'hello@juitafe.com';
        $mail->Password = 'Juita1990#';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->setFrom('hello@juitafe.com', 'Juita Enus Portfolio');
        $mail->addAddress('hello@juitafe.com');
        $mail->addReplyTo($email, $name);

        $mail->Subject = "New message from $name - juitafe.com";
        $mail->Body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        $mail->send();
        http_response_code(200);
        echo "Message sent successfully!";

    } catch (Exception $e) {
        http_response_code(500);
        echo "Failed: {$mail->ErrorInfo}";
    }
}
?>