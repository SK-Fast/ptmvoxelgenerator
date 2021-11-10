
document.addEventListener("DOMContentLoaded", function(event) { 
  const {generateTerrain} = require("fractal-terrain-generator")
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

    ProcessFileIcon.onclick = PrcoessFile

    function SetProgress(Progresss) {
      document.getElementById("processbar").value = Progresss
    }

    function CreateTreePart(PosX,PosY,PosZ,ColorHex,PartName) {
      return `<Item class="Part">
      <Properties>
              <string name="name">${PartName}</string>
              <vector3 name="position">
                <X>${PosX}</X>
                <Y>${PosY}</Y>
                <Z>${PosZ}</Z>
              </vector3>
              <vector3 name="rotation">
                <X>0.00</X>
                <Y>0.00</Y>
                <Z>0.00</Z>
              </vector3>
              <vector3 name="scale">
                <X>3.00</X>
                <Y>3.00</Y>
                <Z>3.00</Z>
              </vector3>
              <string name="color">${ColorHex}</string>
              <string name="shape">cube</string>
              <int name="material">0</int>
              <boolean name="anchored">true</boolean>
              <boolean name="canCollide">true</boolean>
              <boolean name="isSpawn">false</boolean>
              <boolean name="hideStuds">false</boolean>
                  </Properties>
                  </Item>
                  `
    }

    function CreateTree(PosX,PosY,PosZ) {
      if (document.getElementById("Generate-Sand").checked == false) {
        return ""
      }
      let ProcessXML = ""
      ProcessXML = ProcessXML + CreateTreePart(PosX,PosY + 3,PosZ,"#9B7F52","Log")
      ProcessXML = ProcessXML + CreateTreePart(PosX,PosY + 6,PosZ,"#9B7F52","Log")
      ProcessXML = ProcessXML + CreateTreePart(PosX,PosY + 9,PosZ,"#9B7F52","Log")
      ProcessXML = ProcessXML + CreateTreePart(PosX,PosY + 12,PosZ,"#61F272","Grass")
      ProcessXML = ProcessXML + CreateTreePart(PosX + 3,PosY + 12,PosZ,"#61F272","Grass")
      ProcessXML = ProcessXML + CreateTreePart(PosX + 3,PosY + 12,PosZ + 3,"#61F272","Grass")
      ProcessXML = ProcessXML + CreateTreePart(PosX + 3,PosY + 12,PosZ - 3,"#61F272","Grass")
      ProcessXML = ProcessXML + CreateTreePart(PosX,PosY + 12,PosZ - 3,"#61F272","Grass")
      ProcessXML = ProcessXML + CreateTreePart(PosX,PosY + 12,PosZ + 3,"#61F272","Grass")
      ProcessXML = ProcessXML + CreateTreePart(PosX - 3,PosY + 12,PosZ,"#61F272","Grass")
      ProcessXML = ProcessXML + CreateTreePart(PosX - 3,PosY + 12,PosZ + 3,"#61F272","Grass")
      ProcessXML = ProcessXML + CreateTreePart(PosX - 3,PosY + 12,PosZ - 3,"#61F272","Grass")
      ProcessXML = ProcessXML + CreateTreePart(PosX,PosY + 15,PosZ,"#61F272","Grass")
      return ProcessXML
    }


    function PrcoessFile() {
        document.getElementById("LoadingIcon").style.display = "block"
        document.getElementById("ProcessFileIcon").style.display = "none"
        document.getElementById("FileUploadTitle").style.display = "none"

        document.getElementById("ImagePreview").classList.add("Processing-Img")
        document.getElementById("processbar").classList.add("FadeIn-FX")
        document.getElementById("File-Upload-Inner").classList.add("Processing-FileUpload")
        document.getElementById("Configs").style.display = "none"

        console.log("Generating Terrain...")
        function getRndInteger(min, max) {
          return Math.floor(Math.random() * (max - min) ) + min;
        }
        var terrain = generateTerrain(parseInt(document.getElementById("Map-Width").value), parseInt(document.getElementById("Map-Height").value), 4);
        let MaxHeight = 3

          SetProgress(50)
          console.log("Making it into Polytoria Map File..")
          let ProcessXMLFile = `<?xml version="1.0" encoding="UTF-8"?><game><Item class="Environment"><Properties><string name="name">Environment</string></Properties>
          `

          let CurrentPositionX = 0
          let CurrentPositionZ = 0

          terrain.forEach(function (item, index) {
            item.forEach(function (item2, index2) {
              let ProcessSizeY = getRndInteger(3, MaxHeight)
              let ProcessSizeFinal = Math.round(item2 * ProcessSizeY)
              let ProcessColor = "#61F272"
              let CurrentBlockType = "Grass"
              if (ProcessSizeFinal <= -1 && document.getElementById("Generate-Sand").checked) {
                ProcessColor = "#FFF27A"
                CurrentBlockType = "Sand"
              }
              ProcessXMLFile = ProcessXMLFile + `<Item class="Part">
<Properties>
        <string name="name">Part</string>
        <vector3 name="position">
          <X>${CurrentPositionX}</X>
          <Y>${ProcessSizeFinal}</Y>
          <Z>${CurrentPositionZ}</Z>
        </vector3>
        <vector3 name="rotation">
          <X>0.00</X>
          <Y>0.00</Y>
          <Z>0.00</Z>
        </vector3>
        <vector3 name="scale">
          <X>3.00</X>
          <Y>3.00</Y>
          <Z>3.00</Z>
        </vector3>
        <string name="color">${ProcessColor}</string>
        <string name="shape">cube</string>
        <int name="material">0</int>
        <boolean name="anchored">true</boolean>
        <boolean name="canCollide">true</boolean>
        <boolean name="isSpawn">false</boolean>
        <boolean name="hideStuds">false</boolean>
            </Properties>
            </Item>
            `

            if (getRndInteger(1, parseInt(document.getElementById("Tree-Rate").value)) == 2 && CurrentBlockType == "Grass" && document.getElementById("Generate-Sand").checked) {
              ProcessXMLFile = ProcessXMLFile + CreateTree(CurrentPositionX,ProcessSizeFinal,CurrentPositionZ)
            }
            CurrentPositionX = CurrentPositionX + 3
          });
          CurrentPositionX = 0
          CurrentPositionZ = CurrentPositionZ + 3
        })
         if (document.getElementById("Water-Enabled").checked) {
        ProcessXMLFile = ProcessXMLFile + `<Item class="Part">
        <Properties>
                <string name="name">Water</string>
                <vector3 name="position">
                  <X>0.00</X>
                  <Y>-0.5</Y>
                  <Z>0.00</Z>
                </vector3>
                <vector3 name="rotation">
                  <X>0.00</X>
                  <Y>0.00</Y>
                  <Z>0.00</Z>
                </vector3>
                <vector3 name="scale">
                  <X>10000.00</X>
                  <Y>1.00</Y>
                  <Z>10000.00</Z>
                </vector3>
                <string name="color">#17B9FF</string>
                <string name="shape">cube</string>
                <int name="material">0</int>
                <boolean name="anchored">true</boolean>
                <boolean name="canCollide">false</boolean>
                <boolean name="isSpawn">false</boolean>
                <boolean name="hideStuds">true</boolean>
                    </Properties>
                    </Item>
                    `}

          ProcessXMLFile = ProcessXMLFile + `</Item></game>
          `          
          SetProgress(75)
          var file = new Blob([ProcessXMLFile], {type: ""})
          let thelink = URL.createObjectURL(file)
          console.log(thelink)
          var element = document.createElement('a');
          element.setAttribute('href', thelink);
          element.setAttribute('download', 'Terrain.ptm');

          element.style.display = 'none';
          element.click();
          SetProgress(100)
          setTimeout(() => {
            document.location.reload();

          }, 3000);

       

        /*
        const myColors = ImageToColors.get(myImage);
        console.log(myColors)*/
    }
    
    function handleFileSelect(evt) {
    let files = evt.target.files; // FileList object
    
    // use the 1st file from the list
    let f = files[0];
    
    let reader = new FileReader();
    
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
    return function(e) {
      document.getElementById("ImagePreview").src = e.target.result;
    
    };
    })(f);
    
    reader.addEventListener("load", function(e) {
    document.getElementById("ImagePreview").src = e.target.result;
    }); 
    
    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
    }
    
    document.getElementById('upload').addEventListener('change', handleFileSelect, false);
  });