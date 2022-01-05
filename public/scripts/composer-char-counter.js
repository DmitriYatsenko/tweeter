$(document).ready(function () {
    let remainingChars = 140;
    $('#tweet-text').on('keyup', function () {
        let word = $(this).val();
        const wordLength = word.length;
        let htmlTags = word.includes('<') && !word.includes('< ');
        let tooLong = wordLength > remainingChars;

        if (htmlTags && tooLong) {
            // Display error message & character counter in red if tweet is too long & contains HTML tags
            $('#counter').css({ color: 'red' });
            $('.error-text').text('Must be 140 characters or less & not contain HTML tags');
            $('.error-text').css({ color: 'red' });

            // Error message disappears after 2 seconds
            setTimeout(() => {
                $('.error-text').text('');
            }, 2000);

        } else if (!htmlTags && tooLong) {
            // Display character counter in red if tweet is too long
            $('#counter').css({ color: 'red' });
            $('.error-text').text('Must be 140 characters or less');
            $('.error-text').css({ color: 'red' });

            // Error message disappears after 2 seconds
            setTimeout(() => {
                $('.error-text').text('');
            }, 2000);

        } else if (htmlTags && !tooLong) {
            // Display error message in red if tweet contains HTML tags
            $('#counter').css({ color: 'black' });
            $('.error-text').text('Must not contain HTML tags');
            $('.error-text').css({ color: 'red' });

            // Error message disappears after 2 seconds
            setTimeout(() => {
                $('.error-text').text('');
            }, 2000);

        } else {
            // Display character counter normally (in black) if tweet isn't too long & doesn't contain HTML tags
            $('#counter').css({ color: 'black' });
            $('.error-text').text('');
        }
        $('#counter').text(remainingChars - wordLength);
    })
});