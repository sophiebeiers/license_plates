import * as d3 from 'd3'
import {timeFormat} from "d3-time-format";

let margin = { top: 0, left: 0, right: 0, bottom: 0 }

let height = 300 - margin.top - margin.bottom
let width = 400 - margin.left - margin.right

let svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var formatMonth = d3.timeFormat("%B")
var parseDate = d3.timeParse("%y-%m-%d")
Promise.all([
  d3.csv(require('../data/bar_rejected.csv')),
])
  .then(ready)
  .catch(err => {
    console.log('Failed with', err)
  })


function ready([
  data
]) {

  // data.forEach(function(d) {
  //       d.month = parseDate(d.month);
  //       d.n = +d.n;
  //   });

console.log(data)
var xScale = d3
.scaleBand()
.range([0, width])
.domain(data.map(function(d) { return d.row; }))

var yScale = d3
.scaleLinear()
.range([height, 0])
.domain([0, d3.max(data, function(d) { return d.n; })]);


var dateScale = d3
  .scaleTime()
  .domain([new Date('2010-10-01'), new Date('2014-04-01')])
  .range([0, width])

svg
.selectAll('rect')
.data(data)
.enter()
.append('rect')
.attr('x', function(d){return xScale(d.row)})
.attr('y', function(d){return yScale(d.n)})

.attr('width', 5)
.attr('height', function(d) { return height - yScale(d.n); })
.attr('fill', 'red')
.attr('opacity', 0)
.transition()
.duration()
.attr('opacity', 1)

}
