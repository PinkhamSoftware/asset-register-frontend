# Downloading CSV Files

* **Title**: Downloading CSV files from Asset Register API

* **Status**: accepted.

* **Context**: 

The API currently provides search results in a CSV format when given the header `accept: text/csv`. This means we can't simply link to the API on the frontend to have the user download a file, as we need to specify headers. 

There are a couple of approaches:
- Without any work on the backend, we can get the file in javascript and trigger the download on the browser via the use of a library/our own script
  - Pros:
    - No API work required
    - Keeps the API RESTful
  - Cons: 
    - Getting this to work in acceptance tests will require a more heavy frontend test framework, using an actual browser, which will require a lot of work.
    - Downloading files in javascript is not natively supported without the use of creating/deleting DOM elements
- With additional work on the API 
  - We can set the default response to text/csv
  - We can provide 1-time-use links which allow you to download a spreadsheet of results

The pros of both is that we can rely on the native browser downloads to download the files, and the API controls how that happens (with headers).

The downside is that it requires more complications on the API which due to the lack of time we can't work on at the moment.

* **Decision**:

We decided to go with the approach of triggering the download on the frontend, but limiting the dependency on the file download library to a presenter.

* **Consequences**: 

This will require manual testing - and for large files may require some work on making it more clear that the file is currently downloading. However it has been written in such a way it's a single component responsible for this - with reusable use cases/presenters.

Going forward - We should reevaluate the other methods of doing this once we start adding more headers that are specified on requests.

