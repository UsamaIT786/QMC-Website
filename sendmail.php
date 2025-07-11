<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "qmccontracting@gmail.com"; // کمپنی کی ای میل
    $name = strip_tags($_POST["name"]);
    $email = strip_tags($_POST["email"]);
    $phone = strip_tags($_POST["phone"]);
    $subject = strip_tags($_POST["subject"]);
    $message = strip_tags($_POST["message"]);

    $email_subject = "New Contact Form Submission: $subject";
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Phone: $phone\n";
    $email_body .= "Message:\n$message\n";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "<h2>Thank you! Your message has been sent.</h2>";
    } else {
        echo "<h2>Sorry, there was a problem sending your message. Please try again later.</h2>";
    }
} else {
    echo "<h2>Invalid request.</h2>";
}
?> 