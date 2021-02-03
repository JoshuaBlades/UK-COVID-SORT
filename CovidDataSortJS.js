// Object for individual cities
var Cities = [];

function SortData() {
    // Read in the data from the files line by line
    var fs = require("fs");
    var lines = fs.readFileSync("TEXT FILE HERE").toString().split("\n");
    var prevLines = fs.readFileSync("PREVIOUS DAY DATA HERE").toString().split("\n");

    // Sort the data and create individual cities
    for (let i = 1; i < lines.length; ++i) {

        let data = lines[i].split("\t");
        let prevData = prevLines[i].split("\t");

        // Create each city with this information
        var City = {
            Name: data[0],
            Cases: data[1],
            RatePer100K: data[2],
            PrevRatePer100K: prevData[2]
        };

        // Push the city to the array
        Cities.push(City);
    }

    // Sort the array by Rate per 100K, largest first
    Cities.sort(function (a, b) { return b.RatePer100K - a.RatePer100K });

    // Count for labelling cities
    var count = 1;

    // Loop for each city and print the results
    for (var c of Cities) {

        // Make sure only valid information is shown to the user
        if (c.PrevRatePer100K != undefined) {

            // Calcualte the percentage difference
            var RoIChange = (c.RatePer100K - c.PrevRatePer100K) / c.PrevRatePer100K * 100;

            // Print the results to the user in a formatted way
            console.log(count + ". " + c.Name + "\n   ROI: " + c.RatePer100K + "\n   Cases: " + c.Cases + "\n   Change in ROI: " +
                Math.round((RoIChange + Number.EPSILON) * 100) / 100 + "%\n")
            ++count;
        }
    }
}

SortData();