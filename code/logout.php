<?php
    session_start();
    session_regenerate_id();
    session_destroy();
    echo json_encode(array('error' => 0), true);
?>