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
                <div class='postedtweet'>${tweet.content.text}</div>
                <footer>
                    <div class="d8">${date}</div>
                    <div class="icons">
                    <i class="fas fa-flag"></i>
                    <i class="fas fa-retweet"></i>
                    <i class="fas fa-heart"></i>
                    </div>
                </footer>
            </article>
        `
    }

    const renderTweets = function (tweets) {
        $('#tweets-container').empty();
        for (let tweet of tweets) {
            $('#tweets-container').append(createTweetElement(tweet));
        }
    }

    $("#new-tweet-form").submit(function (event) {
        event.preventDefault();
        const textValue = $('#tweet-text').val();

        if (textValue.includes("<") && !textValue.includes("< ")) {
            $('.error-text').text('Must not contain HTML tags');
        } else if (textValue.length > 140) {
            $('.error-text').text('Must be 140 characters or less');
        } else if (textValue === '') {
            $('.error-text').text('Must not be empty');
        } else {
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