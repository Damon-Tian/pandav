export function addImgIcon(map,option={
    imgUrl:"",
    id:'points',
    pointArray:[{
        point:[109.679943564, 35.559617265],
        properties:{name:"测试"}
        }]
    }){    
        let layerId=option.id?option.id:'points'
        if(map.getLayer(option)){
            map.removeLayer(layerId);
            map.removeSource(layerId)
        }
        let features=[];
        if(option.pointArray && option.pointArray.length>0){
            for (const item of option.pointArray) {
                features.push(
                    {
                    'id':item.id,
                    'type': 'Feature',
                    "properties":item, //其中必须包含id字段，用于高亮点钟图标
                    'geometry': {
                         'type': 'Point',
                            
                        'coordinates':item.point
                        }
                    })
            }
        }
        map.loadImage(option.imgUrl,(error, image)=>{
            if (error) throw error;
            if(!map.hasImage('cat')){
               map.addImage('cat', image);
            }
           map.addSource(layerId, {
                'type': 'geojson',
                'data': {
                'type': 'FeatureCollection',
                'features':features
                }
            });
           map.addLayer({
                'id': layerId,
                'type': 'symbol',
                'source':layerId, // reference the data source
                'layout': {
                        'icon-image': 'cat', // reference the image
                        
                     
                }
            });
           
         
        })
      

}