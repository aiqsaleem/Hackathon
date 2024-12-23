document.getElementById("submitBtn").addEventListener("click", function () {
    var name = document.querySelector(".name input").value;
    var email = document.querySelector(".email input").value;
    var phone = document.querySelector(".phone input").value;
    var address = document.querySelector(".address input").value;
    var links = document.querySelector(".link input").value;
    var education = document.querySelector(".education textarea").value;
    var skills = document.querySelector(".skill textarea").value;
    var experience = document.querySelector(".experience input").value;
    var imageFile = document.getElementById("image").files[0];
    var resumeContent = "<h2>".concat(name, "</h2>");
    resumeContent += "<p><strong>Email:</strong> ".concat(email, "</p>");
    resumeContent += "<p><strong>Phone:</strong> ".concat(phone, "</p>");
    resumeContent += "<p><strong>Address:</strong> ".concat(address, "</p>");
    resumeContent += "<p><strong>Links:</strong> ".concat(links, "</p>");
    resumeContent += "<p><strong>Education:</strong> ".concat(education, "</p>");
    resumeContent += "<p><strong>Skills:</strong> ".concat(skills, "</p>");
    resumeContent += "<p><strong>Experience:</strong> ".concat(experience, "</p>");
    if (imageFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var imageDataUrl = e.target.result;
            resumeContent += "<img src=\"".concat(imageDataUrl, "\" alt=\"Profile Image\" style=\"width: 150px; border-radius: 50%;\"/>");
            document.getElementById("resume").innerHTML = resumeContent;
        };
        reader.readAsDataURL(imageFile);
    }
    else {
        document.getElementById("resume").innerHTML = resumeContent;
    }
});
document.getElementById("downloadButton").addEventListener("click", function () {
    var resumeElement = document.getElementById("resume");
    var resumeHTML = resumeElement.innerHTML;
    var blob = new Blob([generateHTMLDocument(resumeHTML)], { type: "text/html" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "resume.html";
    link.click();
    // Clean up URL object
    URL.revokeObjectURL(url);
});
// Helper function to generate a complete HTML document for download
function generateHTMLDocument(content) {
    return "\n      <!DOCTYPE html>\n      <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>Generated Resume</title>\n        <style>\n          body {\n            font-family: Arial, sans-serif;\n            padding: 20px;\n            line-height: 1.6;\n          }\n          h2 {\n            text-align: center;\n            color: #333;\n          }\n          img {\n            display: block;\n            margin: 20px auto;\n            border: 3px solid #ccc;\n          }\n          p {\n            margin: 10px 0;\n          }\n        </style>\n      </head>\n      <body>\n        ".concat(content, "\n      </body>\n      </html>\n    ");
}
