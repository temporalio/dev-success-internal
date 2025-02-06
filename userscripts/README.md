# About Auto Login Scripts
`auto-login-*` scripts will automate parts of the login flow, but you'll still
need to provide your own username, passwords, and 2FA method (OTP/Yubikey).

Some of these scripts require you to supply your username so it can pattern match.
Do not modify the script to store passwords as, sure, they're local memory,
but then you'll have to deal with encryption and such. Use 1Password or another password
manager.


# Installing
You can either install 1 by one, or [all of them at once](#install-all-of-them-at-once)

1. Install [Violentmonkey](https://violentmonkey.github.io/)
2. start a local file server
   ```bash
   python3 -m http.server &
   ```
3. Find the script you want to install, click on it
4. The Violentmonkey UI should pop up to ask if you want to install it

**(Pending approval)** The scripts auto update once a day by default (config in Violentmonkey)


## Install all of them at once
Tip: when the Violetmonkey UI opens, select `Reinstall+Close (⌘Enter)` so you can just spam `⌘+enter`

```bash
python3 -m http.server &
find . | grep "user.js" | sed 's/./http:\/\/localhost:8000/' | xargs open
fg
```


# Contributing

## Local edits
You can edit a userscript in your extension and have a local version. Once it's ready follow instructions to distribute it.

## Push new changes
1. make changes
2. bump the version number in the script header
3. push
4. 🎉
5. If you want a faster update, open the file and reinstall.


## Add a new one
1. Copy the header from one of the existing scripts
2. Change values as needed
   - keep the personal github access token
3. Evangelize your new script
