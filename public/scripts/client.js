$(document).ready(function () {

const data = [
    {
        "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png"
            ,
            "handle": "@SirIsaac"
        },
        "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
    },
    {
        "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd"
        },
        "content": {
            "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
    }
]

const createTweetElement = function (tweet) {
    const date = timeago.format(tweet.created_at);
    return `
    <section class="posted">
    <article>
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
  </section>
    `
}

const renderTweets = function (tweets) {
    console.log(tweets);
    // loops through tweets
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
        // calls createTweetElement for each tweet
        $('#tweets-container').append(createTweetElement(tweet));
        console.log('i');
    }
}

renderTweets(data);
});