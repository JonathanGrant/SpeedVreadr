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
      var articleTxt = "Since the Republican primaries began last fall, family and friends of Donald Trump say they have not recognized the man running for president, that this is not the intelligent, generous, and kind Donald they\’ve come to love and respect over the years. Now we apparently know why. At a campaign rally in Boca Raton, FL yesterday, Joan Cartright, a Trump supporter standing at a rope line, said the Republican candidate approached and gave her a wide smile. That\’s when the Deerfield Beach woman saw \"mechanical parts moving inside his mouth and a small amplifier at the back of his throat projecting his voice.\" Cartright also says there must have been a short circuit in his internal computer because for a few seconds \"his eyes began to flicker with electrical sparks, like little lightning bolts.\" The FBI is taking Cartright\’s observations seriously, saying they are consistent with reports from the CIA that the real Donald Trump may have been kidnapped or killed on the afternoon of July 23, 2015 while playing the 14th hole of his Trump International Golf Links in Balmedie, Scotland. According to observers, Trump went into thick brush to retrieve his ball and disappeared for more than 15 minutes. When he came out, he seemed less animated, more stern, they said. Trump playing golf in Scotland on July 23, 2015, the afternoon in question. \"I asked him if he was alright,\" recalled New England Patriots quarterback Tom Brady, who played a round with the presidential hopeful that day. \"He just looked at me blankly, then said, ‘Yes, I am incredibly strong, stamina good. Clinton weak, crooked.\’ I thought he was joking so I laughed it off and we played on.\" Political observers say that if the Trump campaigning for president today is actually a Russian-made cyborg, it would explain the impostor\’s gushing praise for President Vladimir Putin and a host of other controversial statements and offensive behaviors that people who know the real Donald Trump say are completely out of character. \"I worked for Mr. Trump for 17 years,\" says Loretta McBride, a former Trump hotel manager, \"he was always respectful, friendly and well-mannered. The Mr. Trump I know is a gentleman. The person running for president right now is a phony Trump, I\’m sure of it.\" One Trump campaign insider who asked to speak off the record said, \"Now it all makes sense to me. The Donald Trump we\’ve been working with for the past twelve months is amped up all the time…never sleeps. I don\’t mean hardly ever sleeps, I mean never. That\’s just not normal.\" Another operative added, \"That night when he was tweeting at 3:00 in the morning, he was sitting bolt upright at his desk in a suit, eyes wide open. Now I realize he must have been receiving transmissions, tweeting out whatever he was getting from the Kremlin.\" If intelligence reports about a Trump kidnapping are accurate and the Republican candidate is actually a cybernetic Russian spy sent to disrupt our political process, it is sure to throw this anomalous 2016 election into even greater chaos. While the FBI continues its investigation, the Federal Elections Commission is trying to determine what happens when one party\’s candidate is not human"      
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