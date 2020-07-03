# Aim

- Create a web app to upload reciept details to co-op [claim a receipt](https://membership.coop.co.uk/claim-rewards)

## TODO

- setup firebase to run on bill-extract.guppy16.ml
- Setup github to deploy to firebase
- Backend
  - Setup REST API for:
    - uploading image
    - downloading text
    - post the relevant details to Co-op
  - Process text to extract key information
- Frontend
  - Redo frontend to support backend REST API
  - Setup use of camera using [react-webcam](https://www.npmjs.com/package/react-webcam)
  - Create pages for different views
  - After taking a picture, the user should be allowed to crop out "personal details"
- Google Cloud Backend
  - Set flow to be authenticated using service account if possible

## Frontend
- package dependencies are managed using `yarn`

## Backend
- package dependencies are managed using `npm`
- When running on localhost, ENV variables will need to be setup:
  - `GOOGLE_APPLICATION_CREDENTIALS=[PATH/TO/SERVICE-ACCOUNT.json]`
- Created a REST API to get text from bucket storage
  - To access the text, use http://localhost:5000/GetOCRText?file_name=img4.jpg , where `img4.jpg` can be replaced by the image name

## Google Cloud Backend

- Firebase functions were deployed using [sample git repo](https://github.com/GoogleCloudPlatform/nodejs-docs-samples) in `/functions/ocr/app`
- OCR process was implemented using [Firebase OCR tutorial](https://cloud.google.com/functions/docs/tutorials/ocr)
  - NOTE: Currently set unauthenticated access

  - To view firebase functions `gcloud functions list`
  - To view function details `gcloud functions describe [funcName]`

# Links:

- React hooks [cheat sheet](https://blog.logrocket.com/react-hooks-cheat-sheet-unlock-solutions-to-common-problems-af4caf699e70/)

- Co-op receipt claim [page](https://membership.coop.co.uk/claim-rewards)

---

## Old links

Old links that are likely not needed

- [Ocr using tesseract](https://medium.com/panya-studio-engineering/eliminating-manual-data-entry-using-ocr-to-convert-images-to-text-tesseract-js-react-1099d20a4f4)
-

---

## Resources

This was copied from [my-web-app] repo

- This project was bootstrapped using [Create React App](https://github.com/facebook/create-react-app).
- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deploy to Firebase](https://github.com/marketplace/actions/github-action-for-firebase)
- [`npm run build` fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## Available Scripts

- `yarn start`
- `yarn test` See [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more info
- `yarn build`
- `yarn eject`
