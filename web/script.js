$(document).ready(function() {
    $('#cmd').on('keypress', function(evt) {
        console.log(evt.keyCode);
        if (evt.keyCode == 13) {
            $('#cmd').prop('disabled', true);
            $.ajax({
                url: 'client.php',
                method: 'GET',
                data: {
                    cmds: $('#cmd').val()
                },
                timeout: 3000,
                success: function(data) {
                    $('#result').html(data);
                    $('#cmd').prop('disabled', false).focus();
                },
                error: function(err) {
                    console.log(err);
                    $('#cmd').prop('disabled', false).focus();
                }
            });
            $('#cmd').val('');
        }
    });
    setInterval(function() {
        $('#print').attr('src', './client.php?cmds=getscreenshot&date' + Date.now());
    }, 3000);
});