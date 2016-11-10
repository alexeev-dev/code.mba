<?php

// ----------------------------конфигурация-------------------------- // 
$adminemail="alexeev@code.mba";  // e-mail админа 
$date=date("d.m.y"); // число.месяц.год 
$time=date("H:i"); // часы:минуты:секунды
//---------------------------------------------------------------------- // 


// Принимаем данные с формы
$email=$_POST['email'];

// Отправляем письмо админу  
mail("$adminemail", "Оплата от $email", "$email"); 
 
// Сохраняем в базу данных 
$f = fopen("message.txt", "a+"); 
fwrite($f," \n $date $time Оплата от $email"); 
fwrite($f,"\n $email "); 
fwrite($f,"\n ---------------"); 
fclose($f); 
 
// Переадресуемся
print "<script>window.location.href = 'http://code.mba/registred/'</script>";
exit; 

?>
