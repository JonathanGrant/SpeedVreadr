var Camera = React.createClass({
  getInitialState: function() {
    return {
      pos: '0 0 0'
    }
  },
  render: function() {
    return (
        <a-camera position={this.state.pos}>
            <a-cursor color="#FF0000"></a-cursor>
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
        return(<a-entity text={"text: "+this.props.word} position="-1 -1 -4" scale="1 1 1"></a-entity>)
    }
})

var AFrameScene = React.createClass({
  getInitialState: function() {
      var articleTxt = "PORTLAND, Ore. – Reactions to the not-guilty verdict in the trial of seven people who occupied a national wildlife refuge in eastern Oregon has spread to Craigslist. A prank post listed the Malheur National Wildlife Refuge building for rent. The price: $0. “Quaint, stone cottage in beautiful, country setting!” The post said. “3 bed, 1 bath (3 if you count 2 latrines dug out by our last tenants) with spacious patio and breathtaking views!” The post said the refuge is available now and suggested calling the FBI to schedule a viewing. “If no one is there for the open house you can probably just stay,” it said. The poster also brought up the criticism that if the occupiers had been a race other than white, the situation could have ended differently. “All races welcome to apply! But can only guarantee safety for you-know-which-one (wink wink).” Seven of the occupiers who took over the refuge in early January were acquitted on all charges except one on Thursday. The announcement stunned many and supporters of the occupiers celebrated Thursday and Friday in downtown Portland. "
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
        <Camera />
        <Sky />
        <Words word={this.state.words[this.state.currentWord]}/>
      </a-scene>)
  }
})

ReactDOM.render(<AFrameScene />, document.getElementById('container'))