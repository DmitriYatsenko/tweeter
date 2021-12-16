$(document).ready(function () {
    let remainingChars = 140;
    $('#tweet-text').on('keyup', function () {
        const wordLength = $(this).val().length;
        if (wordLength > remainingChars) {
            $('#counter').css({ color: 'red' })
        } else {
            $('#counter').css({ color: 'black' })
        }
        $('#counter').text(remainingChars - wordLength);
    })

    $('.posted').mouseover(function () {
        $(this).css('box-shadow', '5px 5px 2px #0f0f0f');
    });

    $('.posted').mouseout(function () {
        $(this).css('box-shadow', 'none');
    });
});