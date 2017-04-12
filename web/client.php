<?php
$cmds = $_GET['cmds'];
$socket = stream_socket_client('tcp://127.0.0.1:1337');
if ($socket) {
    $sent = stream_socket_sendto($socket, $cmds);
    if ($sent > 0) {
        stream_set_chunk_size($socket, 124217628);
        $server_response = fread($socket, 1024 * 1024);
        if($cmds == 'getscreenshot') {
            header('Content-Type: image/jpeg');
            echo $server_response;
        } else {
            echo nl2br($server_response);
        }
    }
} else {
    echo 'Sem conexão com o servidor';
}
stream_socket_shutdown($socket, STREAM_SHUT_RDWR);
