var TO_ADDRESS = "sproutdesigntwalt@gmail.com"; // where to send form data

// spit out all the keys/values from the form in HTML for email
function formatMailBody(obj, order) {
  var result = "";
  // loop over all keys in the ordered form data
  for (var idx in order) {
    var key = order[idx];
    result += "<p>" + key + ":  " + obj[key] + "</p>";
  }
  return result; // once the looping is done, `result` will be one long string to put in the email body
}

function doPost(e) {

  try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger
    
    var mailData = e.parameters;
    
    var dataOrder = JSON.parse(e.parameters.formDataNameOrder);
    
    MailApp.sendEmail({to: String(TO_ADDRESS), 
                       subject: "Contact Form Submitted",
                       htmlBody: formatMailBody(mailData, dataOrder)});//JSON.stringify(e.parameters));
    // return json success results
    return ContentService
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "data": JSON.stringify(e.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // if error return this
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}