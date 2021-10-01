function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function generateEmail(name) {
    var email_list = ["mwc7"];
    if (toTitleCase(name) == "Mattheus Colyn") {
        var email = email_list[0]
    } else {
        var email = "UNKNOWNEMAIL"
    }
    return email + "@students.calvin.edu";
}

function getFormattedDate() {
    var currentdate = new Date()
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[currentdate.getMonth().toString()];
    const day = currentdate.getDate().toString();
    const year = currentdate.getFullYear().toString();
    return month + " " + day + ',' + " " + year;
}

function getRadioCheckedValue(radio_name) {
    var oRadio = document.forms[1].elements[radio_name];
    for(var i = 0; i < oRadio.length; i++) {
        if(oRadio[i].checked) {
            return oRadio[i].value;
        }
    }
    return '';
}

function getGender() {
    var radios = document.getElementsByName('studentgender');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == 'male') {
                return ['he', 'him', 'his']
            } else if (radios[i].value == 'female') {
                return ['she', 'her', 'her']
            } else {
                return ['they', 'them', 'their']
            }
            break;
        }
    }
}

function getBody(pronouns0, pronouns1, pronouns2) {
    var bodytext = ""
    var bodylist = []
    var boxes = document.getElementsByName('reportbody');
    for (var i = 0, length = boxes.length; i < length; i++) {
        if (boxes[i].checked) {
            if (boxes[i].value == "basicgrammar") {
                bodylist.push("worked on mechanics, reading " + pronouns2 + " paper aloud and fixing incorrect usage of punctuation.")
            } else if (boxes[i].value == "structure") {
                bodylist.push("worked on the structure of the paper. I suggested " + pronouns0 + " take a look at each paragraph and make sure each paragraph had a consistent subject.")
            }
        }
    }
    bodytext += " We " + bodylist[0]
    for (var i = 1, length = bodylist.length; i < length; i++) {
        bodytext += " We also " + bodylist[i]
    }
    return bodytext
}


function concatenateReport() {
    studentPronouns = getGender()
    var studentname = document.getElementById("studentname").value;
    studentname = toTitleCase(studentname);
    var profname = document.getElementById("profname").value;
    profname = toTitleCase(profname);
    var course = document.getElementById("course").value;
    course = toTitleCase(course);
    var consultantname = document.getElementById("consultantname").value;
    consultantname = toTitleCase(consultantname);
    var papertopic = " on " + document.getElementById("papertopic").value;
    var namelist = studentname.split(" ");
    var bodytext = getBody(studentPronouns[0], studentPronouns[1], studentPronouns[2]);
    var error_message = "";
    if (document.getElementById("studentname").value == "") {
        error_message += "No value given for STUDENT NAME. "
    };
    if (document.getElementById("profname").value == "") {
        error_message += "No value given for PROF NAME. "
    };
    if (document.getElementById("course").value == "") {
        error_message += "No value given for COURSE. "
    };
    if (document.getElementById("consultantname").value == "") {
        error_message += "No value given for CONSULTANT NAME. "
    };
    if (document.getElementById("papertopic").value == "") {
        error_message += "No value given for PAPER TOPIC. "
    };
    if (error_message.length > 0) {
        alert(error_message)
    } else {
        document.getElementById("sessionreport").value = "Rhetoric Center Session Report: " + studentname + "\n"
        + "Student Name: " + studentname + "\n"
        + "Professor: " + profname + "\n" 
        + "Session Date: " + getFormattedDate() + "\n" 
        + "Class: " + course + "\n\n"
        + "Session Report:\n"
        + namelist[0] + " came in to work on " + studentPronouns[2] + " paper" + papertopic + " for " + course + "." 
        + bodytext + "\n\n"
        + "Consultant Name: " + consultantname + "\n"
        + "Consultant Email: " + generateEmail(consultantname) + "\n\n"
        + "Please email rhetoric@calvin.edu with any questions.\n\n"
        + "Thank you,\n"
        + consultantname + ", Rhetoric Center Consultant"
    };
}
