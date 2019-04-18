# Knight Life API
### v2.0 Documentation
The following will provide as a brief description of all callable API routes, as well as their general purpose, required parameters, and response. A more in-depth guide will be available soon.
##### API Root URL: https://bbnknightlife.com/api/
## Schedule Routes
### _Schedule Template_
Path: __[/schedule/template](https://bbnknightlife.com/api/schedule/template)__
<br>
Purpose: __Returns the default BB&N schedule__
<br>
###### Request:
```
Method: GET
Headers: None Required
Body: None Required
Params: None Required
```
###### Response:
```
Returns a list of Days, identified by IDs, and a list of blocks available on those days.
```
---
### _Schedule for Specific Date_
Path: __[/schedule](https://bbnknightlife.com/api/schedule)__
<br>
Purpose: __Returns the schedule for a given day.__
<br>
###### Request:
```
Method: GET
Headers: None Required
Body: None Required
Params:
  - date (YYYY-MM-dd)
```
###### Response:
```
Returns a list of blocks occurring on the given `date`. Additionally provides a list of notices to display to the user.
```
---
### _Next Schoolday_
Path: __[/schedule/next](https://bbnknightlife.com/api/schedule/next)__
<br>
Purpose: __Fetches the next Date with blocks available.__
<br>
###### Request:
```
Method: GET
Headers: None Required
Body: None Required
Params:
  - date (YYYY-MM-dd) (this will typically be today's date)
```
###### Response:
```
Returns the Date and Schedule for the next day of school after the given `date`.
```
---
### _Retrieve Special Schedules_
Path: __[/schedule/special](https://bbnknightlife.com/api/schedule/special)__
<br>
Purpose: __Retrieves all upcoming special schedules for the next month.__
<br>
###### Request:
```
Method: GET
Headers: None Required
Body: None Required
Params:
  - date (YYYY-MM-dd) (this will typically be today's date)
```
###### Response:
```
Returns a list of schedules (and dates) across the next 28 days that have irregular block schedules or notices available for the user. This route is commonly accessed to display upcoming irregular schedule items.
```
