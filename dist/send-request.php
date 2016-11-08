<?php
  require 'email.php';

  function handle_request() {
    $text = array("С вашего сайта оставили заявку!");

    if (isset($_POST['email'])) {
      $text[] = "Email: ".$_POST['email'];
    }

    if (isset($_POST['name'])) {
      $text[] = "Имя: ".$_POST['name'];
    }

    if (isset($_POST['phone'])) {
      $text[] = "Телефон: ".$_POST['phone'];
    }

    if (isset($_POST['message'])) {
      $text[] = "Сообщение: ".$_POST['message'];
    }

    if (isset($_POST['source'])) {
      $text[] = "Заявка отправлена с формы: ".$_POST['source'];
    }

    $m = new EMail(implode("\r\n", $text)."\r\n");
    $m -> setSubject("CODE.mba => ".$_POST['source']);
    $m -> from("".$_POST['email']."");
    $m -> sendTo("alexeev@code.mba");
  }

  handle_request();

?>
