# Histogram using react, VX, and D3 arrays

This task took about 10 hours, with no vx and d3 background
Introduced to ReactJS 2 weeks earlier, I had back-end js experience, no front.

The main file is 
https://github.com/Kvntn/histogram-react/blob/main/src/components/Chart.js

## Method

I started by gathering information from the FakerQL API (tbh, it took a while to figure out how gql queries work, the syntax, variables...)

Then handled the data to fit the needs for the histogram
[{month:"jan", value:0}, ...]

I then checked tutorial on bar chart, followed it carefully and here we are.
(Accessors, bounds, scales, and finally the bars forming the final chart)
## Documentation

Searched for explained codes on the net, here are the most useful links
https://github.com/notrab/fakerql 
https://fakerql.goosfraba.ro/
for gql training

https://www.epochconverter.com/
https://stackoverflow.com/questions/4631928/convert-utc-epoch-to-local-date
for Epoch date handling

https://joelmturner.com/blog/data-vis-react-bar-chart-vx/
for bar chart creation

