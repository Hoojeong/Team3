function drawchart(cssSelector,datafile){

    function verticalWrap(text, width) {
        text.each(function() {
            var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    x = text.attr("x"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }

//get data
    d3.json(datafile, function(error, dataset) {
        if (error) throw error;

        //set position variables
        var margin = {top: (parseInt(d3.select(cssSelector).style('height'), 10)/5), right: (parseInt(d3.select(cssSelector).style('width'), 9)/3), bottom: (parseInt(d3.select(cssSelector).style('height'), 10)/20), left: (parseInt(d3.select(cssSelector).style('width'), 11)/6)},
                width = parseInt(d3.select(cssSelector).style('width'), 10) - margin.left - margin.right,
                height = parseInt(d3.select(cssSelector).style('height'), 10) - margin.top - margin.bottom;

        var y0 = d3.scale.ordinal()
                .rangeRoundBands([height, 0], .2, 0.5);

        var y1 = d3.scale.ordinal();

        var x = d3.scale.linear()
                .range([0, width]);

        //set colors
        var color = d3.scale.ordinal()
                // .range(colorRange.range());
                .range(["rgba(60,179,113,1)", "rgba(255,165,0,1)", "rgba(60,179,113,0.5)", "rgba(255,165,0,0.5)"]);

        var xAxis = d3.svg.axis()
                .scale(x)
                .tickSize(-height)
                .orient("bottom");

        var yAxis = d3.svg.axis()
                .scale(y0)
                .orient("left");

        var divTooltip = d3.select("body").append("div").attr("class", "toolTip");


        var svg = d3.select(cssSelector).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var options = d3.keys(dataset[0]).filter(function(key) { return key !== "label"; });

        dataset.forEach(function(d) {
            d.valores = options.map(function(name) { return {name: name, value: +d[name]}; });
        });

        y0.domain(dataset.map(function(d) { return d.label; }));
        y1.domain(options).rangeRoundBands([0, y0.rangeBand()]);
        x.domain([0, d3.max(dataset, function(d) { return d3.max(d.valores, function(d) { return d.value; }); })]);


        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

        svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

        var bar = svg.selectAll(".bar")
                .data(dataset)
                .enter().append("g")
                .attr("class", "rect")
                .attr("transform", function(d) { return "translate( 0,"+ y0(d.label) +")"; });

        var bar_enter = bar.selectAll("rect")
                .data(function(d) { return d.valores; })
                .enter()


        bar_enter.append("rect")
                .attr("height", y1.rangeBand())
                .attr("y", function(d) { return y1(d.name); })
                .attr("x", function(d) { return 0; })
                .attr("value", function(d){return d.name;})
                .attr("width", function(d) { return x(d.value); })
                .style("fill", function(d) { return color(d.name); });

        bar_enter.append("text")
                .attr("x", function(d) { return x(d.value) +10;  })
                .attr("y", function(d) { return y1(d.name) +(y1.rangeBand()/2); })
                .attr("dy", ".35em")
                .text(function(d) { return d.value; });

        bar
                .on("mousemove", function(d){
                    divTooltip.style("left", d3.event.pageX+10+"px");
                    divTooltip.style("top", d3.event.pageY-25+"px");
                    divTooltip.style("display", "inline-block");
                    var x = d3.event.pageX, y = d3.event.pageY
                    var elements = document.querySelectorAll(':hover');
                    l = elements.length
                    l = l-1
                    elementData = elements[l].__data__
                    divTooltip.html((d.label)+"<br>"+elementData.name+"<br>"+elementData.value);
                });
        bar
                .on("mouseout", function(d){
                    divTooltip.style("display", "none");
                });

        var legend = svg.selectAll(".legend")
                .data(options.slice())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
                .attr("x", width + 186)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

        legend.append("text")
                .attr("x", width + 180)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function(d) { return d; });

        d3.json("data/ethics/subtitles.json", function(error, subtitleData) {

            var myTitle = subtitleData[datafile]['title']
            var mySubTitle = subtitleData[datafile]['subtitle']

            svg.append("text")
                    .attr("x", (width / 2))
                    .attr("y", 0 - (margin.top / 2))
                    .attr("text-anchor", "middle")
                    .attr("class", "subtitle")
                    .style("font-size", "10px")
                    .text(mySubTitle);

            svg.append("text")
                    .attr("x", (width / 2))
                    .attr("y", 0 - (margin.top / 2) + 20)
                    .attr("text-anchor", "middle")
                    .attr("class", "title")
                    .style("font-size", "20px")
                    .text(myTitle);

        })

    });
}

// function for buttons to show and hide charts
function update(cssSelector) {

// hide anything that matches .charts
  for(x of document.querySelectorAll(".charts")){
    x.style.display='none';
    }
// show anything that matches cssSelector
  for(x of document.querySelectorAll(cssSelector)){
    x.style.display='';
    }
}
drawchart("#ineligible-benefits","data/ethics/Q177.json")
drawchart("#free-riding","data/ethics/Q178.json")
drawchart("#stealing","data/ethics/Q179.json")
drawchart("#tax-fraud","data/ethics/Q180.json")
drawchart("#bribery","data/ethics/Q181.json")
drawchart("#homosexuality","data/ethics/Q182.json")
drawchart("#prostitution","data/ethics/Q183.json")
drawchart("#abortion","data/ethics/Q184.json")
drawchart("#divorce","data/ethics/Q185.json")
drawchart("#premarital-sex","data/ethics/Q186.json")
drawchart("#suicide","data/ethics/Q187.json")
drawchart("#euthanasia","data/ethics/Q188.json")
drawchart("#domestic-violence","data/ethics/Q189.json")
drawchart("#corporal-punishment","data/ethics/Q190.json")
drawchart("#physical-violence","data/ethics/Q191.json")
drawchart("#terrorism","data/ethics/Q192.json")
drawchart("#casual-sex","data/ethics/Q193.json")
drawchart("#political-violence","data/ethics/Q194.json")
drawchart("#death-penalty","data/ethics/Q195.json")

//initiat chart
update("#ineligible-benefits")