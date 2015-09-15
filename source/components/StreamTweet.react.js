var React = require("react");
var ReactDOM = require("react-dom");
var Header = require("./Header.react");
var Tweet = require("./Tweet.react");

var StreamTweet = React.createClass({
  getInitialState: function() {
    console.log("[Twitterest] StreamTweet: 1. Running getInitialState()");

    return {
      numberOfCharactersIsIncreasing: null,
      headerText: null
    };
  },

  componentWillMount: function() {
    console.log("[Twitterest] StreamTweet: 2. Running componentWillMount()");

    this.setState({
      numberOfCharactersIsIncreasing: true,
      headerText: "Latest public photo from Twitter"
    });

    // twitterest global object to track received and displayed tweets
    // this is just for demonstration purposes, do not use in production
    window.twitterest = {
      numberOfReceivedTweets: 1,
      numberOfDisplayedTweets: 1
    };
  },

  componentDidMount: function() {
    console.log("[Twitterest], StreamTweet: 3. Running componentDidMount()");

    var componentDOMRepresentation = ReactDOM.findDOMNode(this);

    // you can identify how many child elements by looking at the render method
    // The parent <section> element has 2 child components, <Header /> and <Tweet />
    window.twitterest.headerHtml = componentDOMRepresentation.children[0].outerHTML;
    window.twitterest.headerHtml = componentDOMRepresentation.children[1].outerHTML;
  },

  componentWillReceiveProps: function (nextProps) {
    console.log('[Snapterest] StreamTweet: 4. Running componentWillReceiveProps()');

    var currentTweetLength = this.props.tweet.text.length;
    var nextTweetLength = nextProps.tweet.text.length;
    var isNumberOfCharactersIncreasing = (nextTweetLength > currentTweetLength);
    var headerText;

    this.setState({
      numberOfCharactersIsIncreasing: isNumberOfCharactersIncreasing
    });

    if (isNumberOfCharactersIncreasing) {
      headerText = 'Number of characters is increasing';
    } else {
      headerText = 'Latest public photo from Twitter';
    }

    this.setState({
      headerText: headerText
    });

    window.twitterest.numberOfReceivedTweets++;
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    console.log('[Snapterest] StreamTweet: 5. Running shouldComponentUpdate()');

    return (nextProps.tweet.text.length > 1);
  },

  componentWillUpdate: function (nextProps, nextState) {
    console.log('[Snapterest] StreamTweet: 6. Running componentWillUpdate()');
  },

  componentDidUpdate: function (prevProps, prevState) {
    console.log('[Snapterest] StreamTweet: 7. Running componentDidUpdate()');

    window.twitterest.numberOfDisplayedTweets++;
  },

  componentWillUnmount: function() {
    console.log("[Twitterest], StreamTweet: 8. Running componentWillMount()");

    delete window.twitterest;
  },

  render: function() {
    console.log("[Twitterest] StreamTweet: Running render()");

    return (
      <section>
        <Header text={this.state.headerText} />
        <Tweet
          tweet={ this.props.tweet }
          onImageClick={ this.props.onAddTweetToCollection } />
      </section>
    );
  }
});

module.exports = StreamTweet;