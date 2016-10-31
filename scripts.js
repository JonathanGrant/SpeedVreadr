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
      return {
          words: this.props.readingMaterial.split(" "),
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

var InputScene = React.createClass({
  submitText: function() {
    var text = document.getElementById('article').value
    console.log(this.props)
    if(text != ""){
      this.props.letsRead(text)
    } else {
      console.log("Text area is empty")
    }
  },
  render: function() {
    return (<div>
        <textarea id='article' rows="10" cols="50"></textarea>
        <button onClick={this.submitText}>Speed Vread!</button>
      </div>)
  }
})

var WebPage = React.createClass({
  getInitialState: function() {
    return {
      webState: 'input',
      readingMaterial: ''
    }
  },
  openVReader: function(text){
    this.setState({
      webState: 'VRead',
      readingMaterial: text
    })
  },
  render: function() {
    if(this.state.webState == 'input') {
      return (<InputScene letsRead={this.openVReader}/>)
    } else {
      return (<AFrameScene readingMaterial={this.state.readingMaterial}/>)
    }
  }
})

ReactDOM.render(<WebPage />, document.getElementById('container'))