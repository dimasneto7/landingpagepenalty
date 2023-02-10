<?php
  $nome = $_POST["nome"];
  $email = $_POST["email"];

  $arquivo = fopen("inscritos.txt", "a");
  fwrite($arquivo, "$nome - $email\n");
  fclose($arquivo);
?>


