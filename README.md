# Standard_10
Based on the Remington Standard #10 typewriter.

<br>

This package is built with JavaScript and React components. There are zero dependencies other than React, as dependencies are unreliable and subject to change without warning.

<br>

The goal of this package is to provide react components which will 'type' text across the screen with various properties to set the exact manner in which the characters/words appear on the screen. The impetus behind this project is because I wanted to just find a package that did this, but couldn't find one that matched my needs. So I make dis.

<br>

It's in the command line phase right now, but here are some basic instructions for usage as it stands:

1. mkdir Standard_10 && cd into it && touch index.mjs
2. npm init
3. add "type":"module" to package.json
4. Ready to type!!!

```
import Standard_10 from 'standard-10'

let s10 = new Standard_10()

s10.parseTest(/* input goes here */);
s10.toString();
```
