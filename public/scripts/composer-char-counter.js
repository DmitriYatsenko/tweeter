$(document).ready(function () {
    let remainingChars = 140;
    $('#tweet-text').on('keyup', function () {
        const wordLength = $(this).val().length;
        if (wordLength > remainingChars) {
            $('#counter').css({color: 'red' })
        } else {
            $('#counter').css({color: 'black' })
        }
        $('#counter').text(remainingChars - wordLength);
    })
});