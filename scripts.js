var Camera = React.createClass({
  getInitialState: function() {
    return {
      pos: '0 0 0'
    }
  },
  render: function() {
    return (
        <a-camera position={this.state.pos}>
          <Words word={this.props.word}/>
        </a-camera>
        )
  }
})

var Sky = React.createClass({
  render: function() {
    return (
        <a-sky src="./3.jpg">
        </a-sky>
        )
  }
})

var Words = React.createClass({
    render: function() {
        return(<a-entity text={"text: "+this.props.word} position="-1 0 -4" scale="1 1 1"></a-entity>)
    }
})

var AFrameScene = React.createClass({
  getInitialState: function() {
      var articleTxt = "Hey Dad, It\'s your Zunik. You know, it\'s funny, I was just sitting and talking to my team about content and I said that I didn\'t want to do a particular article because I didn\'t \"feel it.\" Then the first thing that rushed into my brain and my heart was actually to write this letter because I guess I\'m \"feeling it.\" I\'ve gotten some interesting comments from the Larry King interview that I did where people said, \"You really gave your dad some good daps.\" It\'s funny, dad, as I sit here right now writing this letter (or at least memoing it cause that\'s how I do it), I\'ve been giving a lot of thought to life. I don\'t know if you heard, but I\'m 40 now. My kids are getting older and I\'m becoming a more experienced dad. This got me thinking about what we worked on together for 20 years, from 1992 to 2012. It wasn\'t until the late 90s and early 2000s that I really started to get to know you. I especially remember how intense it was to spend so much time with you while we were busy building a business. In the 70s and 80s, we really didn\'t get to know each other because you just worked so hard to support us. And I thank you for that dad. I thank you so much for your sacrifices. But I also know on some level, you love the work, because it\'s your natural state to be an entrepreneur and build for yourself. I am built the same way. You love Wine Library. Heck, maybe even more than you love some family members. It almost seemed selfish. But, it doesn\'t take away from the fact that your hard work established the foundations for our family here in America. I remember when you told me about your great uncle who visited you in Russia from America in the early 70s. That\'s what inspired you to emigrate at a time when many people (even though it should have been so obvious) didn\'t want to take the risk and leave the Soviet Union. But you took it. And you made sure to bring the whole family, including your mom and your grandparents. You came to this country and you worked so damn hard for everyone. You know, it\'s funny, through all of our frictions from building the business, it\'s always been super easy for me to focus on how different we are and all the things that we disagree on. It could be because I don\'t see you every day like I used to or that I\'m not at Wine Library day to day, but, over the last 24–36 months, I\'ve noticed a trend. I\'ve started to notice not how we\'re different, but how we\'re similar. I always talk about how I wish there was content or DailyVee that documented what was going on when I was in my 20s and 30s. It would probably show that I believed I was 90% mom and 10% you. I truly thought that back then because I didn\'t know you as well, dad. And to be honest, I didn\'t know myself as well back then either. Now in 2016, as I\'m sitting here dictating this letter, it\'s interesting to see how much more like you I am than I even realized. I think my hard work and my hustle is my separation from the marketplace and I know that\'s a learned behavior by watching how you did it. Officially today, I feel like I might actually be 50/50 you and mom. Go figure. I\'m writing this because I want you to know how much you mean to me. Even though I spent my 20s and 30s focused on our differences, disagreements, and the things I was going to prove to you, I\'ve realized now that was my own ego. I was so scared that my narrative would be that you were the only reason I was successful. Even to this day, dad, I know you don\'t read the comments on the Internet. (Thank God you don\'t because it would be really scary to see what you would do if you community managed. I don\'t think I\'d have any fans left. You surely wouldn\'t.) But you\'d find it interesting how many people will say on YouTube \"Don\'t listen to this guy, his dad had a liquor store and that\'s why he\'s successful.\" It was the biggest fear I had. Now, as those negative comments are the far minority, I\'m no longer afraid to be in the shadow of your success. In fact, I\'ve become passionate about celebrating your legacy. I\'ve realized what you built didn\'t become the narrative of my accomplishments, but the context for how much you\'ve helped me get there. I want you to know that now. Not when you\'re 90, or 100, or 130, or on your deathbed. I want you to know how much you mean to me and how thankful I am and how much I have learned from the way you and mom navigated your lives. I thank you from the bottom of my heart and I wish you the greatest Father\'s Day today, tomorrow, the next day, and for the rest of your life. And I want you to know how huge of an impact you\'ve made on me. Because we\'re not with each other every day, I know you are probably starting to recognize how much I am able to accomplish on my own, with my DNA and skills, and how much it seems to separate us. In actuality, I\'m finding myself pulling closer to all the things that you did, enabled, created, and taught me. It has been the foundation for my success. So I thought it was a good time to say \"Hey. I love you.\""
      var words = articleTxt.split(" ")
      return {
          words: words,
          currentWord: 0,
          playState: 'first',
          pressed: false
      }
  },
  timeForCurrentWord: function() {
      return (30 * this.state.words[this.state.currentWord].length) + 80
  },
  nextWord: function() {
      if(this.state.playState == 'play') {
          if(this.state.currentWord < this.state.words.length - 1) {
              this.setState({currentWord: this.state.currentWord + 1})
              setTimeout(this.nextWord, this.timeForCurrentWord())
          } else {
              this.setState({playState: 'end'})
          }
      }
  },
  btnPress: function() {
    if(this.state.pressed) {
      if(this.state.playState == 'first') {
        this.setState({playState: 'play', pressed: false})
        setTimeout(this.nextWord, 100)
      } else if(this.state.playState == 'play') {
        this.setState({playState: 'pause', pressed: false})
      } else if(this.state.playState == 'pause') {
        this.setState({playState: 'play', pressed: false})
        setTimeout(this.nextWord, 100)
      } else if(this.state.playState == 'end') {
        this.setState({playState: 'play', currentWord: 0, pressed: false})
      }
    } else {
      this.setState({pressed: true})
    }
  },
  render: function() {
    return (
      <a-scene onMouseDown={this.btnPress}>
        <Camera word={this.state.words[this.state.currentWord]}/>
        <Sky />
      </a-scene>)
  }
})

ReactDOM.render(<AFrameScene />, document.getElementById('container'))