document.getElementById("submitBtn")!.addEventListener("click", () => {
    const name = (document.querySelector(".name input") as HTMLInputElement).value;
    const email = (document.querySelector(".email input") as HTMLInputElement).value;
    const phone = (document.querySelector(".phone input") as HTMLInputElement).value;
    const address = (document.querySelector(".address input") as HTMLInputElement).value;
    const links = (document.querySelector(".link input") as HTMLInputElement).value;
    const education = (document.querySelector(".education textarea") as HTMLTextAreaElement).value;
    const skills = (document.querySelector(".skill textarea") as HTMLTextAreaElement).value;
    const experience = (document.querySelector(".experience input") as HTMLInputElement).value;
    const imageFile = (document.getElementById("image") as HTMLInputElement).files![0];
  
    let resumeContent = `<h2>${name}</h2>`;
    resumeContent += `<p><strong>Email:</strong> ${email}</p>`;
    resumeContent += `<p><strong>Phone:</strong> ${phone}</p>`;
    resumeContent += `<p><strong>Address:</strong> ${address}</p>`;
    resumeContent += `<p><strong>Links:</strong> ${links}</p>`;
    resumeContent += `<p><strong>Education:</strong> ${education}</p>`;
    resumeContent += `<p><strong>Skills:</strong> ${skills}</p>`;
    resumeContent += `<p><strong>Experience:</strong> ${experience}</p>`;
  
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageDataUrl = e.target!.result as string;
        resumeContent += `<img src="${imageDataUrl}" alt="Profile Image" style="width: 150px; border-radius: 50%;"/>`;
        document.getElementById("resume")!.innerHTML = resumeContent;
      };
      reader.readAsDataURL(imageFile);
    } else {
      document.getElementById("resume")!.innerHTML = resumeContent;
    }
  });
  
  document.getElementById("downloadButton")!.addEventListener("click", () => {
    const resumeElement = document.getElementById("resume")!;
    const resumeHTML = resumeElement.innerHTML;
  
    const blob = new Blob([generateHTMLDocument(resumeHTML)], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
  
    link.href = url;
    link.download = "resume.html";
    link.click();
  
    // Clean up URL object
    URL.revokeObjectURL(url);
  });
  
  // Helper function to generate a complete HTML document for download
  function generateHTMLDocument(content: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generated Resume</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            line-height: 1.6;
          }
          h2 {
            text-align: center;
            color: #333;
          }
          img {
            display: block;
            margin: 20px auto;
            border: 3px solid #ccc;
          }
          p {
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `;
  }
  