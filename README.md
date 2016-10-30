# TWD Downloader

This is a utility to download comic book pages of "The Walking Dead".

This is a semi-automated script based on NodeJS. There are several node modules named "twd{ISSUE-NO}".js which contain the download information for each issue (cf. the module file name).

Just run "$ node app.js" and the script will download all JPG files defined in the modules. Note: "_downloads" directory needs to exist before running. If not the first run will fail. Just "$ node app.js" again, this second time everything will be fine.

Result of the script execution should be a number of directories in "_downloads" named 1, 2, 3 ... where the name represents the issue number. Inside of each directory you will find a number of JPG files named 1.JPG, 2.JPG, etc. where each file represents the respective page inside the given issue.

Disclaimer: I developed this script to practice my NodeJS coding skills. The purpose of this script is not piracy of comic book pages. Go to Amazon (or whereever) and pay for your comics.
