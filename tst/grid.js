import * as d3 from 'd3'

let margin = { top: 0, left: 0, right: 0, bottom: 0 }

let height = 900 - margin.top - margin.bottom
let width = 570 - margin.left - margin.right

let svg = d3
  .select('#chart-2')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

Promise.all([
  d3.csv(require('../data/rejected-plates.csv')),
])
  .then(ready)
  .catch(err => {
    console.log('Failed with', err)
  })

function ready([
  data
]) {


var row = 0;

svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .classed("bad", function(d){return d.plate == "BAD2SS"})
    .attr('height', 15)
    .attr('width', 30)
    .attr('fill', '#fff')
    .attr('stroke', '#9F303C')
    .attr('stroke-width', 2)
    .attr('opacity', 1)
	  .attr("x", function(d, i){ return ((i%15 + 1) * (36)) - 1;})
		.attr("y", function(d, i){ if(i%15 == 0){row++}; return row * (20);})

var row2 = 0
svg
    .selectAll('text')
    .data(data)
    .enter()
    .append("text")
    .text(function(d){ return d.plate})
    .attr('id', function(d){return d.plate})
    .attr('class', 'all_plates_text')
	  .attr("x", function(d, i){ return ((i%15 + 1) * (36)) + 14;})
		.attr("y", function(d, i){ if(i%15 == 0){row2++}; return row2 * (20) + 10;})
    .attr("font-family", "sans-serif")
    .attr("font-size", "5px")
    .attr("text-anchor", "middle")



// d3.select('#one').on('stepin', () => {
//     svg
//       .selectAll('rect')
//       .transition()
//       .duration(800)
//       .ease(d3.easeBack)
//       .attr('opacity', 1)
//   })

d3.select('#two').on('stepin', () => {

    svg
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr('opacity', 0.1)

    svg
      .selectAll('.bad')
      .transition()
      .duration(200)
      .attr('opacity', 1)
      .attr('height', 30)
      .attr('width', 60)

      svg
      .selectAll('.all_plates_text')
      .transition()
      .duration(800)
      .attr('opacity', 0.1)

      svg
      .selectAll('#BAD2SS')
      .transition()
      .duration(800)
      .attr('opacity', 1)
      .attr('font-size', '14px')
      .attr('transform', 'translate(' + 14 + ',' + 10 + ')')


    })









  }
