# Parcel template

This project was created using Parcel. To learn more and configure additional features, refer to the [documentation](https://parceljs.org/).

## Preparing a new project

1. Make sure you have the LTS version of Node.js installed on your computer.  
   [Download and install it](https://nodejs.org/en/) if necessary.
2. Clone this repository.
3. Rename the folder from `parcel-project-template` to your project name.
4. Create a new empty repository on GitHub.
5. Open the project in VSCode, run the terminal, and connect the project to the GitHub repository
   [following this guide](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories#changing-a-remote-repositorys-url).
6. Install project dependencies in the terminal with `npm install`.
7. Start the development server with `npm start`.
8. Open [http://localhost:1234](http://localhost:1234) in your browser.  
   This page will automatically reload after you save changes to project files.

## Files and folders

- All stylesheet partials should be placed in the `src/sass` folder and imported into page stylesheet files. For example, for `index.html` the stylesheet file should be named `index.scss`.
- Add images to the `src/images` folder. The bundler will optimize them, but only when you deploy the production version of the project. All optimization happens in the cloud so it doesn't overload your computer, since on weak machines this can take a long time.

## Deployment

To configure deployment of the project you need to complete several additional steps in your repository settings. Go to the `Settings` tab and in the `Actions` subsection choose `General`.

![GitHub actions settings](./assets/actions-config-step-1.png)

Scroll to the last section of the page, make sure the options are selected as shown in the image below, and click `Save`. Without these settings the workflow will not have enough permissions to automate the deployment process.

![GitHub actions settings](./assets/actions-config-step-2.png)

The production version of the project will be automatically built and deployed to GitHub Pages in the `gh-pages` branch every time the `main` branch is updated (for example, after a direct push or an accepted pull request). For this you need to edit the `homepage` field and the `build` script in `package.json`, replacing `your_username` and `your_repo_name` with your own, then push the changes to GitHub.

```json
"homepage": "https://your_username.github.io/your_repo_name/",
"scripts": {
  "build": "parcel build src/*.html --public-url /your_repo_name/"
},
```

Next, open your repository settings (`Settings` > `Pages`) and set the source for publishing the production files to the `/root` folder of the `gh-pages` branch, if it wasn't set automatically.

![GitHub Pages settings](./assets/repo-settings.png)

### Deployment status

The deployment status of the most recent commit is shown by the icon next to its identifier.

- Yellow — build and deploy are in progress.
- Green — deploy completed successfully.
- Red — an error occurred during linting, build, or deploy.

For more details about the status click the icon and then follow the `Details` link in the dropdown.

![Deployment status](./assets/status.png)

### Live page

After a short time (usually a couple of minutes) the live page will be available at the URL specified in the edited `homepage` property. For example, here is the live version for this repository:
[https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

If the page is blank, check the `Console` tab for errors related to incorrect paths to CSS and JS files (404). Most likely you have an incorrect `homepage` value or `build` script in `package.json`.

## How it works

![How it works](./assets/how-it-works.png)

1. After every push to the `main` branch of the GitHub repository, a special script (GitHub Action) defined in `.github/workflows/deploy.yml` runs.
2. All repository files are copied to a server where the project is initialized and built before deployment.
3. If all steps succeed, the built production files are pushed to the `gh-pages` branch. Otherwise, the execution log will indicate what went wrong.
