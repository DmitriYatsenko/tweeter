$(document).ready(function () {

    const loadTweets = function () {
        $.ajax('/tweets', { method: 'GET' })
            .then(function (tweets) {
                renderTweets(tweets);
            });
    }

    loadTweets();

    const createTweetElement = function (tweet) {
        const date = timeago.format(tweet.created_at);
        return `
            <article class="posted">
                <header class="tweet-header">
                    <div class="tweet-header-profile">
                    <img src="${tweet.user.avatars}">
                    <span>${tweet.user.name}</span>
                    </div>
                    <div class="handle">${tweet.user.handle}</div>
                </header>
                <div class='postedtweet'><span style="word-wrap:break-word; overflow:auto">${tweet.content.text}</span></div>
                <footer>
                    <div class="d8">${date}</div>
                    <div class="icons">
                    <i class="fas-fa-flag"></i>
                    <i class="fas-fa-retweet"></i>
                    <i class="fas-fa-heart"></i>
                    </div>
                </footer>
            </article>
        `
    }

    const renderTweets = function (tweets) {
        $('#tweets-container').empty();
        for (let tweet of tweets) {
            // reverse chronological order: prepend instead of append
            $('#tweets-container').prepend(createTweetElement(tweet));
        }
    }

    $("#new-tweet-form").submit(function (event) {
        event.preventDefault();
        const textValue = $('#tweet-text').val();
        let htmlTags = textValue.includes('<') && !textValue.includes('< ');
        let tooLong = textValue.length > 140;
        let empty = textValue === '';

        if (htmlTags && tooLong) {
            // Display error message & character counter in red if tweet is too long & contains HTML tags
            $('.error-text').text('Must be 140 characters or less & not contain HTML tags');

            // Error message disappears after 2 seconds
            setTimeout(() => {
                $('.error-text').text('');
            }, 2000);

        } else if (!htmlTags && tooLong) {
            // Display character counter in red if tweet is too long
            $('.error-text').text('Must be 140 characters or less');

            // Error message disappears after 2 seconds
            setTimeout(() => {
                $('.error-text').text('');
            }, 2000);

        } else if (htmlTags && !tooLong) {
            // Display error message in red if tweet contains HTML tags
            $('.error-text').text('Must not contain HTML tags');

            // Error message disappears after 2 seconds
            setTimeout(() => {
                $('.error-text').text('');
            }, 2000);

        } else if (empty) {
            // Display error message in red if user attempts to post empty tweet
            $('.error-text').text('Must not be empty');
            $('.error-text').css({ color: 'red' });

            // Error message disappears after 2 seconds
            setTimeout(() => {
                $('.error-text').text('');
            }, 2000);

        } else {
            // No error message if no error
            $('.error-text').text('');
            const d8a = $(this).serialize();
            $.ajax('/tweets', { method: 'POST', data: d8a })
                .then(function () {
                    $("#new-tweet-form")[0].reset();
                    $("#counter").text('140');
                    loadTweets();
                })
        }
    });
});