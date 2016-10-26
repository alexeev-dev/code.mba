<?php
  class EMail {
    private $message;
    private $headers;
    private $subject = "No subject";

    public function __construct($message) {
      $this -> message = $message;
      $this -> makeHeaders();
    }

    public function sendTo($receivers) {
      $headers = implode("\r\n", $this -> headers);
      $subject = self::encode($this -> subject);

      mail($receivers,
        $subject,
        $this -> message,
        $headers);
    }
    
    public function from($sender) {
      $this -> headers[] = "From: " . $sender;
    }
    
    public function setSubject($subject) {
      $this -> subject = $subject;
    }
    
    private function makeHeaders() {
      $this -> headers = array(
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8");
    }
    
    static private function encode($src) {
      mb_internal_encoding("UTF-8");
      return mb_encode_mimeheader($src, "UTF-8");
    }

  }
?>
