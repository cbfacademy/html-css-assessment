// used in index.html
/**
 * You are given a variable marks. Your task is to print the following grades:
 * A+ if marks is greater than 90.
 * A if marks is greater than 80 and less than or equal to 90.
 * B if marks is greater than 70 and less than or equal to 80.
 * C if marks is greater than 60 and less than or equal to 70.
 * D if marks is greater than 50 and less than or equal to 60.
 * E if marks is greater than 40 and less than or equal to 50.
 * F if marks is greater than 30 and less than or equal to 40.
 */
function getGrade(score) {
  if (score < 0 || score > 100) return "Invalid score";

  switch (true) {
    case score <= 30:
      return "U";
    case score <= 40:
      return "F";
    case score <= 50:
      return "E";
    case score <= 60:
      return "D";
    case score <= 70:
      return "C";
    case score <= 80:
      return "B";
    case score <= 90:
      return "A";
    case score <= 100:
      return "A+";
  }
}
