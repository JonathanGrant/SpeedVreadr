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
    getInitialState: function() {
        return {
            words: ['Hey', 'welcome', 'to', 'SpeedVreadr', 'the', 'Virtual', 'Reality', 'speed', 'reader.', 'Hey', 'welcome', 'to', 'SpeedVreadr', 'the', 'Virtual', 'Reality', 'speed', 'reader.', 'Hey', 'welcome', 'to', 'SpeedVreadr', 'the', 'Virtual', 'Reality', 'speed', 'reader.', 'Hey', 'welcome', 'to', 'SpeedVreadr', 'the', 'Virtual', 'Reality', 'speed', 'reader.', 'Hey', 'welcome', 'to', 'SpeedVreadr', 'the', 'Virtual', 'Reality', 'speed', 'reader.'],
            currentWord: 0
        }
    },
    timeForCurrentWord: function() {
        return (10 * this.state.words[this.state.currentWord].length) + 250
    },
    componentDidMount: function() {
        setTimeout(this.nextWord, this.timeForCurrentWord())
    },
    nextWord: function() {
        if(this.state.currentWord < this.state.words.length - 1) {
            this.setState({currentWord: this.state.currentWord + 1})
            setTimeout(this.nextWord, this.timeForCurrentWord())
        }
    },
    render: function() {
        return(<a-entity text={"text: "+this.state.words[this.state.currentWord]} position="-1 -1 -4" scale="1 1 1"></a-entity>)
    }
})

var AFrameScene = React.createClass({
  render: function() {
    console.log(this.state)
    // var sg = this.aStarCreateGrid()
    // var path = this.aStarSearch(sg, sg[7][7], sg[1][1])
    return (
      <a-scene onMouseDown={this.restartAStar}>
        <Camera />
        <Sky />
        <Words />
      </a-scene>)
  }
})

ReactDOM.render(<AFrameScene />, document.getElementById('container'))