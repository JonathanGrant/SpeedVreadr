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
  getInitialState: function() {
    return {
      pos: '1 1 -4'
    }
  },
  render: function() {
    return (
        <a-sky src="./sky.jpg">
        </a-sky>
        )
  }
})

var AFrameScene = React.createClass({
  getInitialState() {
    return {
      bitch: 'mouth'
    }
  },
  render: function() {
    console.log(this.state)
    // var sg = this.aStarCreateGrid()
    // var path = this.aStarSearch(sg, sg[7][7], sg[1][1])
    return (
      <a-scene onMouseDown={this.restartAStar}>
        <Camera />
        <Sky />
      </a-scene>)
  }
})

ReactDOM.render(<AFrameScene />, document.getElementById('container'))