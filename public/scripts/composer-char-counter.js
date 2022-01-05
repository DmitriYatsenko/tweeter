$(document).ready(function () {
    let remainingChars = 140;
    $('#tweet-text').on('keyup', function () {
        let word = $(this).val();
        const wordLength = word.length;
        let htmlTags = word.includes('<') && !word.includes('< ');
        let tooLong = wordLength > remainingChars;

        if (htmlTags && tooLong) {
            $('.error-text').text('Must be 140 characters or less & not contain HTML tags');
            $('.error-text').css({ color: 'red' });
            $('#counter').css({ color: 'red' });
        } else if (!htmlTags && tooLong) {
            $('.error-text').text('Must be 140 characters or less');
            $('.error-text').css({ color: 'red' });
            $('#counter').css({ color: 'red' });
        } else if (htmlTags && !tooLong) {
            $('.error-text').text('Must not contain HTML tags');
            $('.error-text').css({ color: 'red' });
            $('#counter').css({ color: 'black' });
        } else {
            $('.error-text').text('');
            $('#counter').css({ color: 'black' });
        }
        $('#counter').text(remainingChars - wordLength);
    })
});