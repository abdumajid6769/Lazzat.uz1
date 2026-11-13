'use strict';
function geoPoint(lat,lng){lat=Number(lat);lng=Number(lng);return Number.isFinite(lat)&&Number.isFinite(lng)&&Math.abs(lat)<=90&&Math.abs(lng)<=180?{lat,lng}:null;}
function geoDistance(a,b){if(!a||!b)return null;const rad=x=>x*Math.PI/180,dLat=rad(b.lat-a.lat),dLng=rad(b.lng-a.lng),v=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLng/2)**2;return 6371*2*Math.atan2(Math.sqrt(v),Math.sqrt(Math.max(0,1-v)));}
function geoReadPair(lat,lng){return String(lat??'').trim()!==''&&String(lng??'').trim()!==''?geoPoint(lat,lng):null;}
function geoFresh(c,now=Date.now()){return c?.gpsSharing&&c.location&&now-c.location.at<60000&&now>=c.location.at&&geoPoint(c.location.lat,c.location.lng)?c.location:null;}
function geoLabel(point){return point?`${point.lat.toFixed(6)}, ${point.lng.toFixed(6)}`:'Nuqta belgilanmagan';}
