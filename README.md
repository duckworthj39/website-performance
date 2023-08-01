# Brief

- The client, Amazon.com, has requested a single page website proof-of-concept that displays a summary of it's website performance vs 3 key competitors: walmart.com, bestbuy.com, target.com.
- The client has decided to use the analysis API provided at: https://pagespeed.web.dev/
- The client is seeking a comparative summary of the data in up to a maximum of 3 charts or visualisations which can be quickly scanned by senior management.
- The client wants the ability to manually refresh the data on a daily basis, with the ability to compare historical results in a later project phase.
- The client wants the website and charts to be written in Javascript. The remaining components are left to developer discretion.

# Website Performance

This app displays the basic speed scores of amazon.com vs 3 competitors:

- Walmart
- Target
- Best Buy

# App Dependencies

- Node 16.17.0
- React 18 (yarn should handle this)
- Express 4.16.1

# Technologies To Note

- React
- Express
- Jest (unit testing)
- Tailwind (CSS)
- EsLint (linting)

# App Structure

There are two applications, one to handle the frontend react app and another to handle the backend express app.
The reason we have a backend is to handle the API calls to the lighthouse API. This is done to prevent CORS issues.
The backend app also allows us to seperate the handling of the api data so we can give the frontend react application a much easier set of data to deal with.
This also allows us to be open for extension to the application such as storing of historical data and the ability to easily cache data to speed up the app.

## How to run

There are two applications to run, Website Performance and the Website Performance Backend API. I would not advise running this on a Windows machine.

- First ensure you have also cloned the backend application from https://github.com/duckworthj39/website-performance-backend into the same folder as the frontend application.
- Next run `yarn install`
- Then run `yarn start`
- Then you can run `cd ../website-performance-backend` and run `yarn install`
- Then run `yarn start`

## How to run tests

- Run `yarn test`

## How to run linting

- Run `yarn lint`
- Run `yarn lint:fix` to fix any linting issues
- Run `yarn format` to format the code using prettier

## Why I used this architecture

As mentioned in the App Structure section calling the lighthouse API from the frontend would cause CORS issues. This is because the lighthouse API is not CORS enabled.
To get around this I created a backend API that would handle the calls to the lighthouse API and return the data to the frontend.
Having the data parsed in the backend to a usable state means we can do more with that data such as storing exactly what we need in a readable structure.

## How we can improve the backend

The backend is simple at the moment and could be improved by adding a database to store the data. This would allow us to cache the data and speed up the app.
We could store the date the data was collected and then only collect new data if the date is older than a certain amount of time.
From there we could then use a queueing system to collect the data in the background and then update the frontend when the data is ready.
I would recommend sticking to the same ecosystem in this situation so using postgres to store the data and something like resque (https://github.com/actionhero/node-resque) to schedule jobs to pull the data.
Another obvious technology to use would be some kind of ORM. In express we can use Prisma (https://www.prisma.io/) to handle the database connection and queries.

## Adding historical data to the frontend

The frontend is currently only displaying the current data. To improve this we could simple add a date picker that passes the date to the backend when making the API call.
We can then use the data collected in the database to find a specific dates speedScore for all the competitors and return that data in the exact same JSON structure to our frontend app.

## Additional Improvements

Competitors may change in the future, currently the sites we compare Amazon against are hardcoded.
To improve this we could add a database to store the competitors and then have a UI to add and remove competitors.
From there when we go to view the performance we should be able to view which competitors we are comparing against.
