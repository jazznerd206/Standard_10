<h1 align="center"># Standard_10</h1>
<p align="center">Based on the Remington Standard #10 typewriter.</p>

<p align="center">
    <img src="typewriter_image.jpeg" style="border-radius: 25px; max-height: 400px; width: auto;"
    />
</p>

<p align="center" style="font-style: italic;">
Author: Andrew Miller
</p>

<br>

This package is built with JavaScript and nothing else. There are zero direct dependencies, as dependencies are unreliable and subject to change without warning. While there are no direct dependencies, it does require node to run via http-server (installed globally).

<br>

Standard_10 provides a JavaScript module which will 'type' text across the screen with various properties to set the exact manner in which the characters/words appear. Read further for instance and usage instructions ->
<img src="firstScreen.gif" alt="example text" style="max-height: 400px;"/>
<br>

> SIMPLE USAGE

1. `mkdir Standard_10 && cd Standard_10 && touch index.mjs`
2. `npm init`
3. add "type":"module" to package.json
    - modify the npm scripts to launch as a server instead of static files i.e. http-server or light-server
4. `npm install standard_10`
5. Ready to type!!! Open your favorite text editor (its ok if its Vim... kind of) and past the code below into it.

```
import Standard_10 from 'standard-10';

// DOM field initialization (skip if already exists)
let el = document.createElement('div');
el.setAttribute('id', 'standard_10');

// target element (pass to instance constructor)
let target = document.getElementByID('standard_10');

// options (pass to instance constructor)
let options = {};

// instance constructor
let s10 = new Standard_10(target, options);

// methods
s10.add(/* input goes here */)
s10.parseText();
s10.startAnimation();
```

> REQUIRED FUNCTIONS

| Type            | Signature                                    | Param restrictions                                                                                                                                      |
| --------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| constructor     | const s10 = new Standard_10(target, options) | target (HTML element) -> must be an existing DOM element with a valid id parameter. options (Object) -> see initial vs. advanced options objects below. |
| process data    | s10.parseText()                              | no parameters. this function must be called AFTER all the endemic functions, directly before startAnimation().                                          |
| start animation | s10.startAnimation()                         | no parameters. this must be called DIRECTLY AFTER parseText(), activates animation loop. More endemic function may be called after this.                |

> ENDEMIC FUNCTIONS

| Signature             | Param restrictions                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| s10.add(_S_)          | _S_ must be of type string, 0 < _S_.length < 250, all lowercase (for now, update coming v1.3)     |
| s10.addBackspace(_N_) | _N_ must be of type number, 0 < _N_ < s10.chars.length(), equal to number of characters to delete |
| s10.addPause(_N_)     | _N_ must be of type number, 0 < _N_ < Integer.MAX_VALUE, equal to pause length in milliseconds    |

> OPTIONS PARAMETERS

| Parameter   | Description                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cursorChar  | Sets cursor character value. Accepts a single value of type string. Defaults to pipe character.                                                                                                                                                                                                                                                                                                                           |
| cursorBlink | Sets cursor blink speed in milliseconds. Accepts an integer of type number. Defaults to 500                                                                                                                                                                                                                                                                                                                               |
| typeSpeed   | Accepts 'standard' ('linear', 'randomn' and 'chaotic' coming v2). Modifies the speed at which the characters appear on the screen.                                                                                                                                                                                                                                                                                        |
| deleteSpeed | Accepts 'standard' ('speedUp' and 'choppy' coming v2). Modifies the speed at which the characters appear on the screen.                                                                                                                                                                                                                                                                                                   |
| styles      | Accepts an object of style parameters for each of the following DOM components: domField, node and cursor. All styles must use the following naming convention: for the keys, replace hyphens in the standard css name with underscores, and the values should be strings that match the standard css attribute. See example below for example options object. ANY CSS PROPERRTY CAN BE USED FOLLOWING THESE CONVENTIONS. |

```
    /** INITIAL OPTIONS
     */
    options = {
        content: null,
        cursorChar: '|',
        cursorBlink: 500,
        typeSpeed: 'standard',
        deleteSpeed: 'standard',
        styles: {}
    }
```

```
    /** EXAMPLE OPTIONS OBJECT TO PASS TO CONSTRUCTOR
     */
    const options = {
        options: 'options',
        cursorChar: '|',
        cursorBlink: 500,
        cursorTimeout: 15000,
        styles: {
            // container element (<div>)
            domField: {
                width: '75vw',
                margin: '0 auto',
                position: 'relative',
                padding: '.5em .5em',
                font_variant: 'small-caps',
            },
            // text elements (<span>)
            node: {
                color: Math.random() > .5 ? 'chartreuse' : 'goldenrod',
                transition: 'all 1s',
            },
            // cursor element (<span>)
            cursor: {
                padding: '10px 5px 0 5px',
                margin: 0,
                position: 'fixed',
                display: 'inline-block',
                overflow: 'hidden',
                transition: 'all .25s'
            }
        }
    }
```

## Roadmap

See the [open issues](https://github.com/jazznerd206/Standard_10/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the UnLicense. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

-   linkedIn: https://www.linkedin.com/in/andrew-miller-113a1a195/
-   Gertherb: [https://github.com/jazznerd206/Standard_10](https://github.com/jazznerd206/Standard_10)
