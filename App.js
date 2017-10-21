import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


/**
 * Class that displays animated spritesheet on the screen.
 * @property spriteSheet URI to sprite sheet image.
 * @property sprites Number of sprites on the image.
 * @property speed Time in miliseconds before moving to next sprite.
 */
class AnimatedImage extends React.Component
{
  constructor(props) {
    super(props);

    // Populate data from props
    this.spriteSheet = { uri: props.spriteSheet };
    this.sprites = props.sprites;

    // Get image size
    Image.getSize(this.spriteSheet.uri, (width, height) => {
        this.spriteHeight = height;
        this.spriteWidth = width / this.sprites;
      }
    );

    // Set initial state (sprite position)
    this.state = {
      pos:0,
    };

    // Update every 80ms
    setInterval(() => {
      this.setState(previousState => {
        return { pos: (previousState.pos + 1) % this.sprites };
      });
    }, parseFloat(props.speed));
  }

  render() {
    return (
      <View style={{
                    width: this.spriteWidth,
                    height: this.spriteHeight,
                    overflow: 'hidden',
                    backgroundColor: 'transparent',
                  }}>
        <Image source={ this.spriteSheet }
                style={{
                  width: this.sprites * this.spriteWidth,
                  height: this.spriteHeight,
                  position: 'absolute',
                  left: this.state.pos * this.spriteWidth * -1,
                }} />
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World!</Text>
        <AnimatedImage spriteSheet="https://cdn.codeandweb.com/blog/2014/11/05/animate-sprites-in-css-with-texturepacker/capguy-walk.png"
                       sprites="8"
                       speed="120"/>
       <AnimatedImage spriteSheet="https://cdn.codeandweb.com/blog/2016/05/10/how-to-create-a-sprite-sheet/spritestrip.png"
                      sprites="6"
                      speed="70"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
