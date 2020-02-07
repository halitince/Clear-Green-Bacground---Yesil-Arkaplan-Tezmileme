
    var matrix = [];
    var xLenght = 180;
    var yLenght = 300;

    function BosVarMi(x, y) {
      return BusMu(x - 1, y - 1) ||
        BusMu(x - 1, y - 0) ||
        BusMu(x - 1, y + 1) ||
        BusMu(x - 0, y - 1) ||
        BusMu(x - 0, y + 1) ||
        BusMu(x + 1, y - 1) ||
        BusMu(x + 1, y - 0) ||
        BusMu(x + 1, y + 1);
    }
    function BusMu(x, y) {
      return (x >= 0) && (x < xLenght) && (y >= 0) && (y < yLenght) && matrix[x][y].a == 0;
    }
    function GetP(x, y) {
      return (x * yLenght + y) * 4;
    }

    
    function islemler() {
      var c1 = document.getElementById("myCanvas1").getContext("2d");
      c1.drawImage(document.getElementById("scream"), 0, 0);

      var c2 = document.getElementById("myCanvas2").getContext("2d");

      var c3 = document.getElementById("myCanvas3").getContext("2d");
      c3.drawImage(document.getElementById("scream2"), 0, 0);

      var imgd = c3.getImageData(0, 0, yLenght, xLenght);
      var pix = imgd.data;


      for (var x = 0; x < xLenght; x += 1) {
        var xx = [];
        for (var y = 0; y < yLenght; y += 1) {
          var i = GetP(x, y);
          xx[y] = {
            r: pix[i + 0],
            g: pix[i + 1],
            b: pix[i + 2],
            a: pix[i + 3],
          }
        }
        matrix[x] = xx;
      }


      for (var x = 0; x < xLenght; x += 1) {
        for (var y = 0; y < yLenght; y += 1) {
          var p = matrix[x][y];

          var fark = p.g - ((p.r + p.b) / 2);

          if (fark > 50) {
            p.a = 0;
          }

        }
      }


      for (var x = 0; x < xLenght; x += 1) {
        for (var y = 0; y < yLenght; y += 1) {
          var p = matrix[x][y];

          if ((p.a > 0) && BosVarMi(x, y)) {
            var deger = (p.r + p.g + p.b) / 3;
            p.a = 200 - deger;
          }
        }
      }


      for (var x = 0; x < xLenght; x += 1) {
        for (var y = 0; y < yLenght; y += 1) {
          var i = GetP(x, y);
          var p = matrix[x][y];
          pix[i + 0] = p.r;
          pix[i + 1] = p.g;
          pix[i + 2] = p.b;
          pix[i + 3] = p.a;
        }
      }

      c2.putImageData(imgd, 0, 0);
    }