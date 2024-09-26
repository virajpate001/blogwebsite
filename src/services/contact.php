<?php
// Set CORS headers to allow the request from your React app
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Get the JSON input from React form
$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$email = $data->email;
$message = $data->message;

// Email address where the message will be sent
$to = "virajpate27@gmail.com"; 
$subject = "New Contact Form Submission";
$body = "Name: $name\nEmail: $email\nMessage: $message";
$headers = "From: $email";

// Send the email
if(mail($to, $subject, $body, $headers)) {
    echo json_encode(["status" => "success", "message" => "Email sent successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to send email."]);
}
?>
