var table = document.querySelector('table');

function makeRow() {
    var row = table.insertRow(table.rows.length);
    var cell = [row.insertCell(0), row.insertCell(1), row.insertCell(2), row.insertCell(3), row.insertCell(4)]

    cell[0].innerHTML= `Activity ` + (table.rows.length - 1);
    cell[1].innerHTML= `A` + (table.rows.length - 1);
    cell[2].innerHTML= `<input type="text" id = "weight` + (table.rows.length - 1) + `">`;
    cell[3].innerHTML= `<input type="text" id="grade` + (table.rows.length - 1) + `1">
                        <b>/</b>
                        <input type="text" id="grade` + (table.rows.length - 1) + `2">`;
    cell[4].innerHTML = "";
}

//Creates rows for Activity 1-4
function makeTable() {
  for(var i = 1; i < 5; i++){
    makeRow();
  }
}
makeTable();

//Add an Activity to the table
document.getElementById('addActivity').onclick = function() {
  makeRow();
};

//Update percent for each activity
table.addEventListener('input', () => {
  for (var i = 1; i < table.rows.length; i++) {
    var numerator = document.getElementById('grade' + i + 1).value;
    var denominator =  document.getElementById('grade' + i + 2).value;

      if(numerator >= 0 && denominator > 0) {
        percentage =  numerator / denominator * 100;
        table.rows[i].cells[4].innerHTML = percentage.toFixed(2) + "%";
      }
      else {
        table.rows[i].cells[4].innerHTML = "";
      }
    }
});

//Calculate the mean for all valid grade inputs
document.getElementById('mean').onclick = function() {
  var total = 0;
  var numActivitiesIncluded = 0;

  for (var i = 1; i < table.rows.length; i++) {
    if(parseFloat(table.rows[i].cells[4].innerHTML) >= 0) {
      total += parseFloat(table.rows[i].cells[4].innerHTML);
      numActivitiesIncluded++;
    }
    else {
      window.alert("Activity " + i + " has invalid input so it has been omitted in the mean.");
    }
  }
  if (total >= 0 && numActivitiesIncluded > 0) {
    meanGrade = (total / numActivitiesIncluded).toFixed(2);
    document.getElementById('results').innerHTML = 'Mean grade is ' + meanGrade + `%`;
  }
  else {
    document.getElementById('results').innerHTML = "";
  }
};

//Calculate the weighted grade for the valid grade inputs
document.getElementById('weighted').onclick = function() {
  var total = 0;
  var sumOfWeights = 0;

  for(var i = 1; i < table.rows.length; i++) {
    if(parseFloat(table.rows[i].cells[4].innerHTML) >= 0 && document.getElementById('weight' + i).value > 0) {
     total += parseFloat(table.rows[i].cells[4].innerHTML) * parseFloat(document.getElementById('weight' + i).value);
     sumOfWeights += parseFloat(document.getElementById('weight' + i).value);
    }
    else {
      window.alert("Activity " + i + " has invalid input so it has been omitted in the weighted grade.");
    }
  }
  if(total >= 0 && sumOfWeights > 0) {
    var weightedGrade = (total / sumOfWeights).toFixed(2);
    document.getElementById('results').innerHTML = `Weighted grade is ` + weightedGrade + `%`;6666
  }
  else {
    document.getElementById('results').innerHTML = "";
  }
};
