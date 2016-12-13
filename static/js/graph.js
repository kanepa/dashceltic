queue()
   .defer(d3.json, "/celticHistory/json")
   .await(makeGraphs);

function makeGraphs(error, celticJson) {

    celticJson.forEach(function(p) {
        p["Career Start"] = parseInt(p["Career Start"]);
        p["Career Finish"] = parseInt(p["Career Finish"]);
        p["Career Length"] = p["Career Finish"] - p["Career Start"];
        p["Goals Per Game"] = Math.round(p["Goals"]/p["Appearances"], 3);

        if (!p["Career Length"]) p["Career Length"] = 0;
        console.log(p["Career Length"]);
    });


   //Create a Crossfilter instance
   var ndx = crossfilter(celticJson);
   //
   //  //Define Dimensions
   var dim_player_nation = ndx.dimension(function (d) {
       return d['Nationality'];
    });

   var numPlayersByNationality = dim_player_nation.group(); // done

   var playerNationChart = dc.rowChart("#player-nation-chart");

     playerNationChart
         .width(1000)
         .height(750)
         .transitionDuration(500)
         .dimension(dim_player_nation)
         .group(numPlayersByNationality);  //  1


    var dim_player_position = ndx.dimension(function (d) {
       return d['Position'];
    });

   var numPlayersByPosition = dim_player_position.group(); // done

   var playerPositionChart = dc.pieChart("#player-position-chart");

     playerPositionChart
         .height(200)
         .transitionDuration(500)
         .dimension(dim_player_position)
         .group(numPlayersByPosition);


   var dim_career_length = ndx.dimension(function (d) {
       return d['Career Length'];
    });

   var numPlayersByCareerLength = dim_career_length.group(); // done

   var careerLengthChart = dc.barChart("#career-length-chart");

   var minLength = dim_career_length.bottom(1)[0]["Career Length"];
   var maxLength = dim_career_length.top(1)[0]["Career Length"];

     careerLengthChart
       .width(800)
       .height(200)
         .brushOn(false)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(dim_career_length)
       .group(numPlayersByCareerLength)
       .transitionDuration(500)
       .x(d3.scale.linear().domain([minLength, maxLength]))
       .elasticY(true)
       .xAxisLabel("Career Length")
       .yAxis().ticks(4);


        var dim_player_goals;

        dim_player_goals = ndx.dimension(function (d) {
        return d["Goals"];
        });

        var numPlayersByGoals = ndx.groupAll().reduceSum(function (d) {
            return d["Goals"]
        });

        var goals = dc.numberDisplay("#Appearences");

        goals
            .formatNumber(d3.format("d"))
            .valueAccessor(function (d) {
                return d;
            })
            .group(numPlayersByGoals)
            .formatNumber(d3.format(".3s"));


var dim_player_appearances;

        dim_player_appearances = ndx.dimension(function (d) {
        return d["Appearances"];
        });

        var numPlayersByAppearances = ndx.groupAll().reduceSum(function (d) {
            return d["Appearances"]
        });

        var goals = dc.numberDisplay("#goals");

        goals
            .formatNumber(d3.format("d"))
            .valueAccessor(function (d) {
                return d;
            })
            .group(numPlayersByAppearances)
            .formatNumber(d3.format(".3s"));


var dim_goals_per_game;

        dim_goalspergame = ndx.dimension(function (d) {
        return d["Goals Per Game"];
        });

        var numgoalspergame = ndx.groupAll().reduceSum(function (d) {
            return d["Goals Per Game"]
        });

        var goalspergame = dc.numberDisplay("#goalspergame");

        goalspergame
            .formatNumber(d3.format("d"))
            .valueAccessor(function (d) {
                return d;
            })
            .group(numgoalspergame)
            .formatNumber(d3.format(".3s"));






        var dim_player_transfer = ndx.dimension(function (d) {
        return d['Transfer in'];
        });

        var numtransfersin = dim_player_transfer.group(); // done

        var transfersin = dc.pieChart("#transfersin");

        transfersin
            .height(200)
            .transitionDuration(500)
            .dimension(dim_player_transfer)
            .group(numtransfersin);


        // var dim_scottishplayers= ndx.dimension(function (d) {
        //     return d['Scotland 25 caps'];
        //
        // });
        //
        // var scottishcaps = dim_scottishplayers.group();
        //
        // var scotland = dc.barChart("#scottish");
        //
        // scotland
        // .width(768)
        // .height(480)
        // .x(d3.scale.linear().domain([0,20]))
        // .brushOn(false)
        // .yAxisLabel("This is the Y Axis!")
        // .dimension(dim_scottishplayers)
        // .group(scottishcaps)
        // .on('renderlet', function(chart) {
        //     chart.selectAll('rect').on("click", function(d) {
        //         console.log("click!", d);
        //     });
        // });


    dc.renderAll();
    };