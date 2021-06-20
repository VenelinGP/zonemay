<?php

// name: this.client.name,
// family: this.client.family,
// mobile: this.client.phone,
// email: this.client.email,
// postCode: this.client.postCode,
// city: this.client.city,
// address: this.client.address

require_once '../mailDir/vendor/autoload.php';

// Create the Transport
$transport = (new Swift_SmtpTransport('localhost', 25))
  ->setUsername('website@divetsite.com')
  ->setPassword('website22@@');

// Create the Mailer using your created Transport
$mailer = new Swift_Mailer($transport);

$userName = 'Име и фамилия: ' . htmlspecialchars($_POST['name']) . ' ' . htmlspecialchars($_POST['family']) .'<br>';
$mobile = 'GSM: ' . htmlspecialchars($_POST['mobile']) . '<br>';
$userEmail = 'Имейл: ' . htmlspecialchars($_POST['email']) . '<br>';
$address = 'Адрес: ' . htmlspecialchars($_POST['city']) . ', ' . htmlspecialchars($_POST['postCode']) . ', ' . htmlspecialchars($_POST['address']) . '<br>';
$content = 'Продукти: <br>' . $_POST['products'] . '<br>';

$all = $userName . $mobile . $userEmail . $address . $content;

// Create a message
$message = (new Swift_Message('Нова поръчка'))
  ->setFrom(['zonamai@abv.bg' => 'zonamai@abv.bg'])
  ->setTo([htmlspecialchars($_POST['email']) => 'Office'])
  ->setBody($all, 'text/html');

// Send the message
$result = $mailer->send($message);

?>
<?php
header("Content-Type: application/json");
$myObj->name = "John";
$myObj->age = 30;
$myObj->city = "New York";

$myJSON = json_encode($myObj);

echo $myJSON;
?>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

Съобщението е изпратено успешно! -->

