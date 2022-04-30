// Päikeseloojang ja -tõus: https://www.npmjs.com/package/sunrise-sunset-js

// Kaardi lisamiseks kasutasin: https://openlayers.org/en/latest/doc/quickstart.html
var kaart = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([26.728493, 58.378025]),
    zoom: 5,
  }),
});

// https://gis.stackexchange.com/questions/16906/how-do-i-get-the-coordinates-of-a-click-on-vector-feature-layer-in-openlayers2

kaart.on("click", function (evt) {
  var lonlat = ol.proj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
  var lon = lonlat[0];
  document.getElementById("pikkus").value = lon;
  var lat = lonlat[1];
  document.getElementById("laius").value = lat;
});

function arvuta() {
  var kuupäev_sisend = document.getElementById("kuupäev").value;

  var kuupäev_õhtu = new Date(kuupäev_sisend);
  var kuupäev_hommik = new Date();
  kuupäev_hommik.setDate(kuupäev_õhtu.getDate() + 1);

  var pikkuskraad = document.getElementById("pikkus").value;
  var laiuskraad = document.getElementById("laius").value;

  var loojang = SunCalc.getTimes(kuupäev_õhtu, pikkuskraad, laiuskraad);

  var loojangu_kellaaeg = loojang.sunset.getHours() + ':' + loojang.sunset.getMinutes();

  var tõus = SunCalc.getTimes(kuupäev_hommik, pikkuskraad, laiuskraad);

  var tõusu_kellaaeg = tõus.sunrise.getHours() + ':' + tõus.sunrise.getMinutes();

  let vahe =
    (23 - loojang.sunset.getHours()) * 60 +
    60 -
    loojang.sunset.getMinutes() +
    tõus.sunrise.getHours() * 60 +
    tõus.sunrise.getMinutes();

    window.scrollTo(0, document.body.scrollHeight);


    if (isNaN(vahe)) {
      document.getElementById("vastus").innerHTML = "Palun sisestage vajalikud andmed!";
    } else {

  document.getElementById("vastus").innerHTML = "Teie valitud kuupäeval ja koordinaatidel on öö pikkuseks " + vahe + " minutit!";
    }

}

document.getElementById("arvuta").addEventListener("click", arvuta);
