# Alex's Homepage

A configurable and compact homepage for PC browsers designed

<img src="https://github.com/alex-karev/homepage/raw/main/screenshot.png">

## Features
* Store categorized bookmarks in json file
* Adding/removing search engines
* Configurable colors and images
* Compact, flexible
* Has cute sticker

## Installation
1. Clone this repo to any directory
2. Set index.html as a new home page in your browser
3. Done!

You can also use it as a new tab

1. Install the following extensions:
    * __Firefox:__ [New Tab Override](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/)
    * __Chrome/ium:__ [Custom New Tab URL](https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia?hl=en)
2. Set extensions to use this homepage as a new tab

For better user experience it is recommended to set up http server and store homepage there.

****For Linux users:** There is a systemd service file: `systemd/homepage.service`

1. Edit `homepage.service`. Set path to your homepage directory: `WorkingDirectory=<path-to-homepage>`
2. Copy `homepage.service` to `/etc/systemd/system/`: 

```
sudo cp systemd/homepage.service /etc/systemd/system/homepage.service
```

3. Start service: `sudo systemctl start homepage`
4. Enable service: `sudo systemctl enable homepage`

Your homepage should be accessible now at `127.0.0.1:3000`. Now set this url to be a homepage and a new tab in your browser

## Usage
New bookmarks and new categories are added to `data.json`

You can change search engines in `search.json`

Click gear icon in top right corner to change color, angle, images and other settings

## References
The following resources are used in this project:

* Bootstrap 4: <https://getbootstrap.com/docs/4.0/getting-started/introduction/>
* jQuery: <https://jquery.com/>

## Contributing
You are welcome to fork this repo and to create pull requests

> Please don't make any pull requests that only change bookmarks and search engines, since these are user preferences

## License
Distributed under the MIT License. See LICENSE for more information