import {bbox} from "./lib/truf.js"
export function flyBounds(map, geojson) {
    let bounds = bbox(geojson)
    map.fitBounds([
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]]
    ], {
        padding: {
            top: 10,
            bottom: 25,
            left: 15,
            right: 5
        }
    });
}