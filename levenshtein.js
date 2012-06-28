/**
 * Calculate Levenstein distance between two strings
 * http://en.wikipedia.org/wiki/Levenshtein_distance
 * @param  {string} str1 first string.
 * @param  {string} str2 second string.
 * @return {int}      
 */
function levenshteinDistance(str1, str2) {

  var a = str1.length;
  var b = str2.length;
  var m = []; //matrix

  // Set up matrix y-axis of length of str1
  for (var i = 0; i <= a; i++) {
    m[i] = [i]; 
  }

  // 
  for (var j = 0; j <= b; j++) {
    m[0][j] = j;
  }

  for (var k = 1; k <= b; k++) {
    for (var l = 1; l <= a; l++) {
       if (str1.charAt(l-1) === str2.charAt(k-1)) {
        m[l][k] = m[l - 1][k - 1]; // use last value
       }
       else {
        // deletion, insertion, substitution
        m[l][k] = Math.min(m[l - 1][k] + 1, m[l][k - 1] + 1,  m[l - 1][k - 1] + 1 );
       }
    }
  }

  return m[a][b]; 
}


/**
 * Calculate Damerau–Levenshtein distance between two strings
 * http://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance
 * @param  {string} str1 first string.
 * @param  {string} str2 second string.
 * @return {int}      
 */
function damerauLevenshteinDistance(str1, str2) {

  var a = str1.length;
  var b = str2.length;
  var m = []; //matrix
  var cost;

  // Set up matrix y-axis of length of str1
  for (var i = 0; i <= a; i++) {
    m[i] = [i]; 
  }

  // 
  for (var j = 0; j <= b; j++) {
    m[0][j] = j;
  }

  for (var k = 1; k <= b; k++) {
    for (var l = 1; l <= a; l++) {
      if (str1.charAt(l-1) === str2.charAt(k-1)) {
       cost = 0;
      }
      else {
       cost = 1;
      }
      // deletion, insertion, substitution
      m[l][k] = Math.min(m[l - 1][k] + 1, m[l][k - 1] + 1,  m[l - 1][k - 1] + cost);
      
      if (k > 1 && l > 1 && str1.charAt(k - 1) === str2.charAt(l - 2) && str1.charAt(k - 2) === str2.charAt(l - 1)) {
        m[l][k] = Math.min(m[l][k], m[l - 2][k - 2] + cost);
      }
    }
  }

  return m[a][b]; 
}
