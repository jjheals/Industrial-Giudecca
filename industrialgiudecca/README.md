# IndustrialGiudecca 

## Non-technical Overview
The main idea behind this project was to create a scalable website to host information of the industrial history of Giudecca.
Anyone looking to add onto this project in the future can know that by adding information into the ArcGIS database the website
will be updated with the new information. For people who would like to write more story maps for this project they can simply
copy the ArcGIS link into the `GlobalConstants.js`. The ArcGIS story maps need to have two versions, one of which in Italian
and one in English. The link to the English story would reside in its factoryID in ArcGIS then the respective language.

```javascript
export const factoryStoryMapURLs = {
    // ...
    factoryID: {
        en: 'englishStoryMapLink',
        it: 'italianStoryMapLink'
    }
    // ...
}
```
## Description 

Digitizing historical data is a process that has been made possible through advancements in modern technology. 
Digital databases allow researchers and historians to access copious amounts of information and data; moreover, the digitization of data provides easier access to a wider range of audiences. 
For this project, we seized an opportunity to digitize data about social, cultural, and economic history. 
We created a digital database and designed a digital platform to provide users with information about the industrial history of Giudecca, an island in the Venetian lagoon. 
It is our hope that this project inspires future work to explore solutions for preserving culturally significant histories.

This file goes in depth on how to take care of and maintain the code provided to achieve this goal.

## Directory structure 
Public is used to store images not on ArcGIS such as photos of people on the about page.
```
src
├── App.css
├── App.js
├── App.test.js
├── ArcGIS.js
├── Factory.js
├── GlobalConstants.js
├── components
│ ├── DataExplorer
│ │ ├── DataExplorer.js
│ │ ├── DataExplorerConstants.js
│ │ ├── DataExplorerFunctions.js
│ │ ├── DataExplorerResultsTable.js
│ │ └── DataExplorerSearchBar.js
│ ├── FactoriesMap
│ │ ├── BuildingPin.js
│ │ └── FactoriesMap.js
│ ├── FactoryTimeline.js
│ ├── Footer.js
│ ├── LanguageSelector.js
│ ├── Photo
│ │ ├── Gallery.js
│ │ └── Photo.js
│ ├── SearchBar.js
│ ├── Shapes
│ │ ├── TimelineCircle.js
│ │ ├── TimelineLine.js
│ │ └── TimelineTriangle.js
│ ├── Sidebar.js
│ ├── TimelineMap
│ │ ├── FactoryPin.js
│ │ └── MapTimeline.js
│ └── Title.js
├── context
│ └── LanguageContext.js
├── css
│ ├── AboutPage.css
│ ├── BasicFactoryTemplate.css
│ ├── DataExplorer.css
│ ├── FactoryHomepage.css
│ ├── Homepage.css
│ ├── IndustrialStories.css
│ ├── InteractiveMap.css
│ └── components
│     ├── FactoriesMap.css
│     ├── FactoryTimeline.css
│     ├── Footer.css
│     ├── Gallery.css
│     ├── LanguageSelector.css
│     ├── MapTimeline.css
│     ├── Photo.css
│     ├── Searchbar.css
│     ├── Sidebar.css
│     ├── TimelineCircle.css
│     ├── TimelineLine.css
│     └── Title.css
├── index.css
├── index.js
├── pages
│ ├── AboutPage.js
│ ├── BasicFactoryTemplate.js
│ ├── DataExplorerPage.js
│ ├── FactoryHomepage.js
│ ├── Homepage.js
│ ├── IndustrialStoriesPage.js
└── InteractiveMap.js
├── reportWebVitals.js
├── setupTests.js
└── translations.js
```

## Pages

## Components & Classes

## Usage

## ArcGIS

## Translations

The `translations.js` file contains an object that provides translations for various text elements used throughout the application. The translations are organized into two main language sections: English (`en`) and Italian (`it`).

### Usage

To use the translations in your application, you can import the `translations` object from the `translations.js` file:

```javascript
import translations from './translations';
```

Then, you can access the translations based on the desired language and the specific key. For example, to get the English translation for the homepage title:

```javascript
const homepageTitle = translations.en.homepageTitle;
```

Similarly, you can access the Italian translation for the same key:

```javascript
const homepageTitleItalian = translations.it.homepageTitle;
```

### Translation Keys

The translation keys are organized into different sections based on their usage in the application. Some of the main sections include:

- Homepage translations
- Timeline on homepage translations
- Search bar translations
- Sidebar translations
- Titles
- Data Explorer Page & Components
- BasicFactoryTemplate FactoryTimeline
- About page translations

Each section contains key-value pairs, where the key represents the identifier for the translation and the value represents the actual translated text.

### Adding or Modifying Translations

To add a new translation or modify an existing one, you can simply update the `translations` object in the `translations.js` file. Make sure to provide the translation for both the English and Italian languages.

For example, to add a new translation for a button text:

```javascript
const translations = {
  en: {
    // ...
    buttonText: "Click me",
    // ...
  },
  it: {
    // ...
    buttonText: "Clicca qui",
    // ...
  }
};
```

### Note

The translations in this file were obtained using automatic translation tools such as Google Translate and DeepL. It is mentioned in the disclaimer that the translations may not have been heavily proofread, so there might be some inaccuracies or inconsistencies.

When using the translations, it's recommended to review and verify them to ensure they are appropriate and accurate for your application.


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
