<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);

$mail->setFrom('ved.43d@mail.com', 'professional');
$mail->addAddress('user@gmail.com');
$mail->Subject = 'Привет это твой суп  ер программист';

$hand = 'Right';
if($_POST['hand'] == 'left'){
	$hand = 'Left';
}

$body = '<h1>Title this Message</h1>';

if(trim(!empty($_POST['name']))){
	$body.= '<p><stron>Имя</strong> '.$_POST['name'].'</p>';
}

if(trim(!empty($_POST['email']))){
	$body.= '<p><stron>E-mail</strong>'.$_POST['email'].'</p>';
}

if(trim(!empty($_POST['hand']))){
	$body.= '<p><stron>Рука</strong>'.$hand.'</p>';
}

if(trim(!empty($_POST['age']))){
	$body.= '<p><stron>Возраст</strong>'.$_POST['age'].'</p>';
}

if(trim(!empty($_POST['pl']))){
	$body.= '<p><stron> Язык рограммирования</strong>'.$_POST['pl'].'</p>';
}

if(trim(!empty($_POST['auto']))){
	$body.= '<p><stron>Я хочу автомобиль марки</strong>'.$_POST['auto'].'</p>';
}

if(trim(!empty($_POST['message']))){
	$body.= '<p><stron>Сообщение</strong>'.$_POST['message'].'</p>';
}


if(!empty($_FILES['image']['tmp_name'])){
	$filePath = __DIR__ . "/files/" . $_FILES['image']['name'];

	if(copy($_FILES['image']['tmp_name'], $filePath)){
		$fileAttach = $filePath;
		$body.='<p><strong>Фото в приложении</strong></p>';
		$mail->addAttachment($fileAttach);
	}
}

$mail->Body = $body;


if(!$mail->send()){
	$message = 'Error';
}else{
	$message = 'Данные отравлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>
























