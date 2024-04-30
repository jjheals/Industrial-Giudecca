# IndustrialGiudecca 

## Description 

Digitizing historical data is a process that has been made possible through advancements in modern technology. 
Digital databases allow researchers and historians to access copious amounts of information and data; moreover, the digitization of data provides easier access to a wider range of audiences. 
For this project, we seized an opportunity to digitize data about social, cultural, and economic history. 
We created a digital database and designed a digital platform to provide users with information about the industrial history of Giudecca, an island in the Venetian lagoon. 
It is our hope that this project inspires future work to explore solutions for preserving culturally significant histories.

This file goes in depth on how to take care of and maintain the code provided to achieve this goal.

## Non-technical Overview

The main idea behind this project was to create a scalable website to host information of the industrial history of Giudecca.
Anyone looking to add onto this project in the future can know that by adding information into the ArcGIS database the website
will be updated with the new information.

### Updating story maps 

New story maps for the website can be implemented by pasting two links into the `GlobalConstants.js` file. The ArcGIS story maps need to have two versions: one in Italian and one in English. The link to the English story would reside in the factoryStoryMapURLs dictionary under the 'en' key for that factory ID, and the Italian story under the 'it' key for that factoryID. 

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

For example: 

```javascript
export const factoryStoryMapURLs = {
    // ...
    3: {
        en: 'http://services.arcgis.com/path/to/english/storymap/for/factory/id_3/0',
        it: 'http://services.arcgis.com/path/to/italian/storymap/for/factory/id_3/0'
    },
    // ... 
}
```

### Updating feature layer URLs

If a new feature layer is created for some reason, e.g. it is accidently deleted, moved, or otherwise changes the link, then the code must be updated to reflect this change. This can be done by updating the link for that feature layer in the `GlobalConstants.js` file, in the dictionary `featureLayerServiceURLs`. The [ key : val ] pairs in the dictionary are [ FeatureLayerName : serviceURL ] as seen below: 


```javascript
// URL endpoints for the feature layers that host the data 
export const featureLayerServiceURLs = { 
    'Owner_Over_Time': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Owner_Over_Time/FeatureServer/0',
    'Factory': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory/FeatureServer/0',
    'Employment_Over_Time': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Employment_Over_Time/FeatureServer/0',
    'Factory_Coords': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory_Coords/FeatureServer/0',
    'Product_Over_Time': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Product_Over_Time/FeatureServer/0',
    'Building': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Building/FeatureServer/0',
    'Factory_At_Building': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Factory_At_Building/FeatureServer/0',
    'Timeperiod': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Timeperiod/FeatureServer/0',
    'Photo_Sources': 'https://services7.arcgis.com/BEVijU9IvwRENrmx/arcgis/rest/services/Photo_Sources/FeatureServer/0'
}
```

Changing any of these links will updat the ArcGIS service location for the feature layers; in other words, the application will reach out to these links for the respsective feature layer. **Make sure the link ends in "/0" - by default, ArcGIS service URLs do not have this endpoint but it is necessary to properly retrieve the data.**

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

## Components & Classes

Each of the files contains detailed descriptions on the components and classes contained in that file. Each file can be consulted for documentation on the individual components, however, they broadly fall into these categories:

### ArcGIS integrations

The ArcGIS integrations are done mostly in the functions defined in /src/ArcGIS.js. These functions interact with the ArcGIS API to retrieve FeatureLayer information and files such as pictures. These functions are also used throughout the application in various ways.

### Data Explorer 

The data explorer is likely the most complicated part of the application. It functions by using DataExplorerSearchBar to submit queries to the ArcGIS database; then, it filters these results using the functions in /src/ArcGIS.js and in /src/components/DataExplorer/DataExplorerFunctions.js. The results table is rendered using the setResultsTable() and renderResultsTable() functions in DataExplorerFunctions.js, and the component is located in /src/components/DataExplorer/DataExplorerResultsTable.js. 

The logic of the data explorer is a series of chained AND queries. This is not the *most* efficient, but it works for the purposes of this project. There are certainly opportunities to simplify the logic and improve the implementation. 

### Maps 

The FactoriesMap and MapTimeline are based on the same logic of converting latitude/longitude coordinates into pixel coordinates on a map based on the lat/long coordinates of the corners of the map. In short, this function (defined in ArcGIS.js) takes the difference of the latitude/longitude, i.e. delta lat and delta long, and the delta pixels x and delta pixels y, and scales the latitude/longitude into pixels. This effectively transforms the lat/long coordinates into pixels on a 0,0 grid, where 0,0 is the top left of the map. 

The logic for placing the pins on the map after the coordinates have been calculated are located in FactoryMap and TimelineMap. 

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

## Using the create_sheets.ipynb notebook to update the database

In the data_analysis/ folder, there is a Jupyter notebook containing instructions on how to use it to update the database with new data. In short, this notebook can take in an excel file with multiple sheets and convert these sheets to individual CSV files that can be uploaded to ArcGIS. Once in ArcGIS, the corresponding DataPipelines can be used to update the FeatureLayers with new data. 

## Running the Application

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
