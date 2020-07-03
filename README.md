# Aim
- Create a web app to upload reciept details to co-op [claim a receipt](https://membership.coop.co.uk/claim-rewards)

## TODO
- Setup google cloud authentication
- Setup use of camera using [react-webcam](https://www.npmjs.com/package/react-webcam)
- Create pages for different views
- After taking a picture, the user should be allowed to crop out "personal details"

## Notes
- May need to set ENV variables:
    - `set GOOGLE_APPLICATION_CREDENTIALS=[PATH/TO/SERVICE-ACCOUNT]`
- Backend running of OCR is done through [Firebase OCR tutorial](https://cloud.google.com/functions/docs/tutorials/ocr)
    - NOTE: Currently set unauthenticated access
    - Firebase functions were deployed using [sample git repo](https://github.com/GoogleCloudPlatform/nodejs-docs-samples) in /functions/ocr/app
    - To view firebase functions `gcloud functions list`
    - To view function details `gcloud functions describe [funcName]`


# Links:
- React hooks [cheat sheet](https://blog.logrocket.com/react-hooks-cheat-sheet-unlock-solutions-to-common-problems-af4caf699e70/)

- [Coop claim receipt page](https://membership.coop.co.uk/claim-rewards)


---

## Old links
Old links that are likely not needed
- [Ocr using tesseract](https://medium.com/panya-studio-engineering/eliminating-manual-data-entry-using-ocr-to-convert-images-to-text-tesseract-js-react-1099d20a4f4)
- 

---

## Resources
This was copied from [my-web-app] repo
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deploy to Firebase](https://github.com/marketplace/actions/github-action-for-firebase)
- [`npm run build` fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## Available Scripts

- `npm start`
- `npm test` See [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more info
- `npm run build`
- `npm run eject`