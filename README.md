# YouTube Search

A YouTube video search application built with React.

## Features

- Search for YouTube videos
- Display video thumbnails and titles

## How to use

- Clone the repository
- Create a file `.env` with the contents of `.env.example` as a template
- Run `npm install`
- Run `npm start`
- Open the app in your browser at `http://localhost:3000`
- Type in a search query in the search bar
- Click on a video to view it on youtube

## Technical details

- The app uses the YouTube Data API to fetch video data
- The app uses React hooks to manage state
- The app uses React functional components to render the UI
- The app uses a custom hook to handle the search input
- The app uses a custom hook to handle the infinite scroll

## Screenshots

![YouTube Search](youtube-search-homepage.png)

## Folder Structure

The project is structured as follows:

- `public/`: contains the index.html file and any assets that will be served statically
- `src/`: contains the React components and other source code
  - `components/`: contains the React components
  - `hooks/`: contains the custom React hooks
  - `services/`: contains API integration functions
  - `__tests__/`: contains unit test cases covering most of the scenarios
  - `App.js`: the main React component
  - `index.js`: the entry point for the React app
  - `setupTests.js`: the setup file for the tests
  - `package.json`: the npm package file

## API

The app uses the YouTube Data API to Searcj video data. The API is documented at <https://developers.google.com/youtube/v3/docs/search>

## API Key

The app requires a valid API key to access the YouTube Data API. You can obtain an API key by creating a project in the Google Cloud Console and enabling the YouTube Data API v3.

## Environment Variables

The app uses the following environment variables:

- `REACT_APP_YOUTUBE_API_KEY`: the API key for the YouTube Data API
- `REACT_APP_BASE_URL`: the API URL for the YouTube Data API
- `REACT_APP_PAGE_SIZE`(Optional): the Page Size for each fetch from the Youtube Data API

You can set these environment variables in your `.env` file or in your operating system's environment variables.
