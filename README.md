# Owen Wilson Wow API Frontend

This is an [Angular CLI](https://github.com/angular/angular-cli) project I have created to relearn some skills. This is entirely a front-end for the API provided by https://owen-wilson-wow-api.herokuapp.com/ (which can also be found on [GitHub](https://github.com/amamenko/owen-wilson-wow-api)).

## Existing Functionality

At present, this application can request for 'random' and 'ordered' wows and does so with a filter consisting of 4 options:

Random:
* Results - the number of results to grab
* Year - the year of movie release to filter for (an empty value will negate this part of the filter)
* Movie name - the name of the movie to grab entries for (this is a dropdown so you don't have to invoke your extensive knowledge of Owen Wilson's career :) )
* Director name - the name of the director to grab entries for (this is also a dropdown)

Ordered:
* Starting Index - using this alone will return the 'Wow' at the given index
* Ending Index (Optional) - using this will return the 'Wows' from the starting index to the index provided in this field

## How to use the application

As usual with Angular projects, you are able to use `ng serve` to deploy the application locally. You will find the functionality described above under `/random` and `/ordered` respectively.
