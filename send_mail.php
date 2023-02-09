<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";

    $mail = new PHPMailer(true); /* Создаем объект MAIL */
    $mail->CharSet = "UTF-8"; /* Задаем кодировку UTF-8 */
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true); /* Разрешаем работу с HTML */

    $name = $_POST["name"]; /* Принимаем имя пользователя с формы .. */
    $phone = $_POST["phone"]; /* Телефон */
    $message = $_POST["message"]; /* Сообщение с формы */

    $email_template = "template_mail.html"; // Считываем файл разметки

    $body = file_get_contents($email_template); // Сохраняем данные в $body
    $body = str_replace('%name%', $name, $body); // Заменяем строку %name% на имя
    $body = str_replace('%phone%', $phone, $body); // строку %phone% на телефон
    $body = str_replace('%message%', $message, $body); // строку %message% на сообщение

    $mail->addAddress("andrey@stroi34.ru"); /* Здесь введите Email, куда отправлять */
    $mail->setFrom("andrey@stroi34.ru", 'Сайт Банкротство');
    $mail->Subject = "[Заявка с сайта]"; /* Тема письма */
    $mail->MsgHTML($body);

    /* Проверяем отправлено ли сообщение */
    if (!$mail->send()) {
        $message = "Ошибка отправки";
    } else {
        $message = "Спасибо за Ваше обращение! Мы свяжемся с Вами в течение дня.";
    }

    /* Возвращаем ответ */	
    $response = ["message" => $message];

    /* Ответ в формате JSON */
    header('Content-type: application/json');
    echo json_encode($response);

?>