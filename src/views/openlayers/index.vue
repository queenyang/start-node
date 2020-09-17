<template>
  <div id="map" ref="map"></div>
</template>
<script>
import { mapState } from "vuex";
import Map from "ol/Map";
import View from "ol/View";
import { XYZ, Vector as VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import WMTS from "ol/source/WMTS";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { getTopLeft } from "ol/extent";
export default {
  name: "olMap",
  data() {
    return {
      key: "9b0501db85516e2b6943c61317ec4a7a"
    };
  },
  computed: {
    ...mapState("map", ["boundary"])
  },
  watch: {
    boundary(newVal) {
      if (newVal) {
        this.initMap();
      }
    }
  },
  // mounted() {
  //   this.initMap();
  // },
  methods: {
    initMap() {
      var resolutions = new Array(14);
      var matrixIds = new Array(14);
      var size = (180 * 2) / 256;
      for (var z = 2; z < 19; ++z) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
      }
      new Map({
        layers: [
          new TileLayer({
            source: new XYZ({
              url:
                "https://api.mapbox.com/styles/v1/sisteryang/ckf3ony4704m11ap7r70johcr/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2lzdGVyeWFuZyIsImEiOiJjanNsYzJ1NGEwcGJyNDlvYWJkMzN6NDl6In0.tcDpzwcZkaVwlPO4vwEoBg"
            })
          }),
          new TileLayer({
            // opacity: 0.7,
            source: new WMTS({
              name: "影像底图",
              url: "http://t0.tianditu.gov.cn/img_c/wmts?tk=" + this.key,
              layer: "img",
              style: "default",
              matrixSet: "c",
              format: "tiles",
              wrapX: true,
              tileGrid: new WMTSTileGrid({
                origin: getTopLeft([-180, -90, 180, 90]),
                resolutions: resolutions,
                matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
              })
            })
          }),
          new VectorLayer({
            source: new VectorSource({
              features: new GeoJSON().readFeatures(this.boundary)
            })
          })
        ],
        target: "map",
        view: new View({
          center: [120.16, 30.27], // 经纬度
          projection: "EPSG:4326", // 投影坐标系
          zoom: 10, // 地图缩放级别
          maxZoom: 18, // 地图最大缩放级别
          minZoom: 6 // 地图最小缩放级别
        })
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
