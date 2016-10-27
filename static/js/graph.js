queue()
   .defer(d3.json, "/celticHistory/json")
   .await(makeGraphs);

function makeGraphs(error, celticJson) {

   //Create a Crossfilter instance
   var ndx = crossfilter(celticJson);
   //
   //  //Define Dimensions
   var dim_player_nation = ndx.dimension(function (d) {
       return d['Nationality'];
    });

   var numPlayersByNationality = dim_player_nation.group(); // done

   var playerNationChart = dc.pieChart("#player-nation-chart");  //  plotted and on html

     playerNationChart
         .height(220)
         .radius(90)
         .innerRadius(40)
         .transitionDuration(1500)
         .dimension(dim_player_nation)
         .group(numPlayersByNationality);  //  1



   // var dim_goalsscorers = ndx.dimension(function (d) {  ////Next 2
   //     return d["Goals"];
   //  });
   //  var dim_player_name = ndx.dimension(function (d) { ///  next 3
   //      return d["Name"];
   //  });
   //  var dim_greatestevercelt = ndx.dimension(function (d) { /// next 3
   //      return d["Greatest ever Celtic"];
   //  });
   //  var dim_scotlandcaps = ndx.dimension(function (d) {  /// 4 done
   //      return d["Scotland 25 caps"];
   //  });
   //  var dim_appearances = ndx.dimension(function (d) { // 6
   //      return d["Appearances"];
   //  });
   //  var dim_transfersout = ndx.dimension(function (d) {
   //      return d["Transfers out"];
   //  });
   //  var dim_transfersin = ndx.dimension(function (d) {
   //      return d["Transfer in"];
   //  });
   //  var dim_position = ndx.dimension(function (d) { //5 done
   //      return d["Position"];
   //  });

   //Calculate metrics




   //  var numPlayersgoals = dim_goalsscorers.group(); // done
   //  var numGreatesteverCelt = dim_greatestevercelt.group(); // done
   //
   // var positoncount  = dim_position.group();
   //
   //  var numScotlandcaps = dim_scotlandcaps.group().reduceSum(function(d) { return ["Goals"] });  //
   //   // var totalplayersworldwide = stateDim.group().reduceSum(function (d) {
   //   //    return d["Nationality"];
   //
   //  var totalappearencesbyplayer = dim_appearances.group().reduceSum(function (d) {
   //     return d["total_appearances"];
   //
   //       //Charts
   //       var celticscorers = dc.rowChart("#goals-type-row-chart");  // plotted on html
   //       //  var worldwideplayerssmap = dc.geoChoroplethChart("#players-map");
   //       var scotlandLevelChart = dc.pieChart("#scotland-level-row-chart"); // plotted on html
   //
   //       var greatestever = dc.barChart("#Greatest_Ever_Celt"); // plotted on html
   //
   //       var positioncountchart = dc.barChart("#positioncount");// plotted on html
   //
   //      var totalappearences = dc.numberDisplay("#appearences");

         //
         // celticscorers
         //     .width(400)
         //     .height(250)
         //     .dimension(dim_goalsscorers)
         //     .group(numPlayersgoals)
         //     .xAxis().ticks(10); // 2
         //
         // greatestever /* dc.barChart('#volume-month-chart', 'chartGroup') */
         //     .width(420)
         //     .height(180)
         //     .margins({top: 10, right: 50, bottom: 30, left: 40})
         //     .dimension(dim_player_name) //player name
         //     .group(numGreatesteverCelt)
         //     .elasticY(true); //3
         //
         // positioncountchart /* dc.barChart('#volume-month-chart', 'chartGroup') */
         //     .width(420)
         //     .height(180)
         //     .margins({top: 10, right: 50, bottom: 30, left: 40})
         //     .dimension(dim_position) //player name
         //     .group(positoncount)  //5
         //    .elasticY(true);

         // worldwideplayerssmap
         //     .width(500)
         //     .height(330)
         //     .dimension(stateDim)
         //     .group(numPlayersByNationality)  // this needs to change
         //     .colors(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#7C151D"])
         //     .colorDomain([0, max_state])
         //     .overlayGeoJson(worldwideJson["features"], "state", function (d) { // this has been changed
         //         return d.properties.name;
         //     })
         //     .projection(d3.geo.albersUsa()
         //         .scale(600)
         //         .translate([340, 150]))
         //     .title(function (p) {
         //         return "State: " + p["key"] // this has to be changed
         //             + "\n"
         //             + "Total Donations: " + Math.round(p["value"]) + " $"; // this has to be change
         //     });
         //
         //
        //
        // yearlyBubbleChart
        //
        //      .width(990)
        //      .height(250)
        //      .transitionDuration(1500)
        //      .margins({top: 10, right: 50, bottom: 30, left: 40})
        //      .dimension(yearlyDimension)
        //      .group(yearlyPerformanceGroup)
        //      .colors(colorbrewer.RdYlGn[9])
        //      .colorDomain([-500, 500]);
        //
        //  scotlandLevelChart
        //
        //      .width(420)
        //      .height(180)
        //      .margins({top: 10, right: 50, bottom: 30, left: 40})
        //      .dimension(dim_player_nation)
        //      .group(numPlayersByNationality)
        //      .elasticY(true)
        //      .width(768)
        //      .height(480)
        //      .x(d3.scale.linear().domain([6, 20]))
        //      .brushOn(false)
        //      .symbolSize(8)
        //      .clipPadding(10)
        //      .yAxisLabel("This is the Y Axis!")
        //      .dimension(dim_scotlandcaps)
        //      .group(numScotlandcaps);  //4
        //
        // totalappearences
        //     .formatNumber(d3.format("d"))
        //     .valueAccessor(function (d) {
        //         return d;
        //      })
        //     .group()
        //     .formatNumber(d3.format(".3s"));


         dc.renderAll();
}