(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

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
},{"fractal-terrain-generator":2}],2:[function(require,module,exports){
module.exports = require('./lib/terrain.js');

},{"./lib/terrain.js":3}],3:[function(require,module,exports){
/**
 * @fileoverview Random fractal terrain generator.
 * @author Xueqiao Xu <xueqiaoxu@gmail.com>
 */

// create local scope
(function() {

  /**
   * Generate fractal terrain.
   * @param {number} width - Width of rectangle.
   * @param {number} height - Height of rectangle.
   * @param {number} smoothness - Higher this value, smoother the terrain.
   *      recommended value is 1.
   * @return {Array.<Array.<int>>} A two-dimensional array holding the elevations 
   *     of the vertices of the terrain.
   */
  function generateTerrain(width, height, smoothness) {
    var smoothness = typeof smoothness === 'undefined' ? 1 : smoothness;
    var size = smallestPowerOfTwoAfter(Math.max(width, height));

    var squareTerrain = generateSquareTerrain(size, smoothness);
    var terrain = [];
    // terrain is a matrix of size (width + 1) x (height + 1)
    for (var i = 0; i <= height; ++i) {
      terrain.push(squareTerrain[i].slice(0, width + 1));
    }

    return terrain;
  }

  function smallestPowerOfTwoAfter(n) {
    var ret = 1;
    while (ret < n) {
      ret <<= 1;
    }
    return ret;
  }

  /**
   * Generate a square fractal terrain.
   * @param {number} size - Size of terrain, MUST be a power of 2.
   * @param {number} smoothness - Higher this value, smoother the terrain.
   *      recommended value is 1.
   * @return {Array.<Array.<int>>} A two-dimensional array holding the elevations 
   *     of the vertices of the terrain. Each elevation will be between -1 and 1.
   */
  function generateSquareTerrain(size, smoothness) {
    // throw error if size is not a power of two.
    if (size & (size - 1)) {
      throw new Error('Expected terrain size to be a power of 2, received ' + 
                      size + ' instead.');
    }

    // generate a square matrix
    var mat = generateMatrix(size + 1);

    // iterate on the matrix using the square-diamond algorithm
    iterate(mat, smoothness);

    return mat;
  }

  /**
   * Generate a square matrix
   * @param {number} size - Width and length of the square.
   * @return {Array.<Array.<int>>} The vertices matrix of the square
   */
  function generateMatrix(size) {
    var matrix = [];

    for (var i = 0; i < size; i++) {
      var row = [];
      for (var j = 0; j < size; ++j) {
        row.push(0);
      }
      matrix.push(row);
    };

    return matrix;
  }


  /**
   * Iterate on the matrix using Diamond-Square algorithm.
   * @param {Array.<Array.<int>>} matrix - Matrix to be iterated on.
   * @param {number} smoothness - Smoothness of terrain.
   */
  function iterate(matrix, smoothness) {
    // the count of iterations applied so far
    var counter = 0;
    // the total number of iterations to apply is log_2^(size of matrix)
    var numIteration = Math.log(matrix.length - 1) / Math.LN2;
    while (counter++ < numIteration) {
      diamond(matrix, counter, smoothness);
      square(matrix, counter, smoothness);
    }
  }


  /**
   * Diamond step of iteration.
   * @param {Array.<Array.<int>>} matrix - Matrix to iterate on.
   * @param {number} depth - Depth of current iteration(starts from 1).
   * @param {number} smoothness - Smoothness of terrain.
   */
  function diamond(matrix, depth, smoothness) {

    var matSize = matrix.length - 1;
    var numSegs = 1 << (depth - 1);
    var span = matSize / numSegs;

    // enumerate sub-squares 
    // for each sub-square, the height of the center is caculated
    // by averaging the height of its four vertices plus a random offset.
    for (var x = 0; x < matSize; x += span) {
      for (var y = 0; y < matSize; y += span) {
        //  (x, y)
        //    \
        //     a---b---c
        //     |   |   |
        //     d---e---f
        //     |   |   |
        //     g---h---i
        // 
        //     \___ ___/
        //         V
        //       span 
        // 
        var va = [x, y];
        var vc = [x + span, y];
        var ve = [x + span / 2, y + span / 2];
        var vg = [x, y + span];
        var vi = [x + span, y + span];

        // heights of vertices
        var heights = [va, vc, vg, vi].map(function(v) {
          return matrix[v[1]][v[0]];
        });

        // average height
        var avg = average(heights);

        // random offset
        var offset = getH(smoothness, depth);

        // set center height
        matrix[ve[1]][ve[0]] = avg + offset;
      }
    }
  }


  /**
   * Square step of iteration.
   * @param {Array.<Array.<int>>} matrix - Matrix to iterate on.
   * @param {number} depth - Depth of current iteration(starts from 1).
   * @param {number} smoothness - Smoothness of terrain.
   */
  function square(matrix, depth, smoothness) {

    var matSize = matrix.length - 1;
    var numSegs = 1 << (depth - 1);
    var span = matSize / numSegs;

    // enumerate sub-dimaonds 
    for (var x = 0; x < matSize; x += span) {
      for (var y = 0; y < matSize; y += span) {
        // for each sub-square, the height of the center is caculated
        // by averaging the height of its four vertices plus a random offset.
        // for example, 
        //       h = avg(g, c, i, m) + random;
        //       f = avg(a, g, k, i) + random;
        //       j = f;
        //
        //  (x, y)
        //    \
        //     a---b---c---d---e
        //     | \ | / | \ | / |
        //     f---g---h---i---j
        //     | / | \ | / | \ |
        //     k---l---m---n---o
        //     | \ | / | \ | / |
        //     p---q---r---s---t
        //     | / | \ | / | \ |
        //     u---v---w---x---y
        // 
        //     \___ ___/
        //         V
        //       span 
        // 
        var va = [x, y];
        var vb = [x + span / 2, y];
        var vc = [x + span, y];
        var vf = [x, y + span / 2];
        var vg = [x + span / 2, y + span / 2];
        var vh = [x + span, y + span / 2];
        var vk = [x, y + span];
        var vl = [x + span / 2, y + span];
        var vm = [x + span, y + span];

        var vhr = [(x + span / 2 * 3) % matrix.length, y + span / 2]; // right of h
        var vfl = [(x - span / 2 + matrix.length) % matrix.length, y + span / 2]; // left of f
        var vlu = [x + span / 2, (y + span / 2 * 3) % matrix.length]; // under l
        var vba = [x + span / 2, (y - span / 2 + matrix.length) % matrix.length]; // above b

        squareHelper(matrix, depth, smoothness, va, vg, vk, vfl, vf);
        squareHelper(matrix, depth, smoothness, va, vba, vc, vg, vb);
        squareHelper(matrix, depth, smoothness, vc, vhr, vm, vg, vh);
        squareHelper(matrix, depth, smoothness, vk, vg, vm, vlu, vl);
      }
    }

    // set the elevations of the rightmost and bottom vertices to 
    // equal the leftmost and topmost ones'.
    for (var y = 0; y < matSize; y += span) {
      matrix[y][matSize] = matrix[y][0];
    }
    for (var x = 0; x < matSize; x += span) {
      matrix[matSize][x] = matrix[0][x];
    }
  }

  function squareHelper(matrix, depth, smoothness, a, b, c, d, t) {
    var heights = [a, b, c, d].map(function(v) {
      return matrix[v[1]][v[0]];
    });
    var avg = average(heights);
    var offset = getH(smoothness, depth);
    matrix[t[1]][t[0]] = avg + offset;
  }


  /**
   * Get a random offset.
   * @param {number} smoothness - Higher the value, smoother the terrain.
   *      recommended value is 1.
   * @param {number} depth - Depth of current iteration(starts from 1).
   */
  function getH(smoothness, depth) {
    var sign = Math.random() > 0.5 ? 1 : -1;
    var reduce = 1;
    for (var i = 1; i < depth; ++i) { 
      reduce *= Math.pow(2, -smoothness);
    }
    return sign * Math.random() * reduce;
  }


  function average(numbers) {
    var sum = 0;
    numbers.forEach(function(v) {
      sum += v;
    });
    return sum / numbers.length;
  }


  // export to global
  var root;
  if (typeof exports !== 'undefined' && exports !== null) {
    root = exports;
  } else {
    root = window;
  }
  root.generateTerrain = generateTerrain;

}).call(this);

},{}]},{},[1]);
