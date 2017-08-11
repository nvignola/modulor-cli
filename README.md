# ascesis-cli
Command line tool for create necessary file for new components


# Usage

`createComponent -n demo -p "d-" -d "./test"`

# Options

* _-n|--name_: Component Name
* _-d|--dir_: Target Directory
* _-p|--prefix_: Prefix for Component


# Output

```
➜  ascesis-cli git:(master) ✗ createComponent -n demo -p "d-" -d "./test"
On Loacation: /Library/WebServer/Documents/ascesis-cli/test
/d-demo
 |- d-demo.hyper.html
 |- d-demo.scss
 |- d-demo.js
 |- d-demo.test.js
 |- d-demo.story.js
```
