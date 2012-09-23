function addRow(numberOfRows) {
  if (!numberOfRows) numberOfRows = 1;
  
  for (var i = 0; i < numberOfRows; i++) {
    $("#grades_table tbody").append(
      $("<tr />").attr("class", "grade_row").append(
        $("<td />")
          .css({
            "font-weight": "bold",
            "text-align": "center"
          })
          .text($(".grade_row").length + 1)
      )
      .append(
        $("<td />").append(
          $("<input />")
            .attr({
              "type": "text",
              "class": "class_field",
              "name": "class",
            })
        )
      )
      .append(
        $("<td />").append(
          $("<input />")
            .attr({
              "type": "text",
              "class": "grade_field",
              "name": "grade",
              "size": "3"
            })
        )
      )
      .append(
        $("<td />").append(
          $("<input />")
            .attr({
              "type": "text",
              "class": "credits_field",
              "name": "credits",
              "size": "3"
            })
        )
      )
    );
  }
}

$(document).ready(function() {
  addRow(3);

  $("#add_row").click(function() {
    addRow();
  });
  
  $("#gpa_form").submit(function(e) {
    e.preventDefault();
    
    var gradePoints = 0.0;
    var totalCredits = 0.0;
    
    $(".grade_row").each(function(i) {
      if ($(this).find(".grade_field").val() == "" || $(this).find(".credits_field").val() == "") {
        return;
      }
      
      gradePoints += parseFloat($(this).find(".grade_field").val()) * parseFloat($(this).find(".credits_field").val());
      totalCredits += parseFloat($(this).find(".credits_field").val());
    });
    
    var gpa = gradePoints / totalCredits;
    
    if (gradePoints == 0.0 || totalCredits == 0.0) {
      $("#gpa_output").text("You must enter at least one grade and its corresponding credits.");
    } else if (isNaN(gpa)) {
      $("#gpa_output").text("Could not calculate GPA. Did you input a non-decimal grade?");
    } else {
      $("#gpa_output").html("<span style=\"font-weight: bold;\">GPA:</span> " + gpa);
    }
  });
});