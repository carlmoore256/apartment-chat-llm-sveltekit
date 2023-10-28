export function djb2(str: string){
    var hash = 5381;
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
    }
    return hash;
}

export function hashStringToColor(str: string, alpha: number=0.5, sat: number=1, lightness=0.9) {
    var hash = djb2(str);
    var r = (hash & 0xFF0000) >> 16;
    var g = (hash & 0x00FF00) >> 8;
    var b = hash & 0x0000FF;
    alpha = Math.round(alpha * 255)
    var hexAlpha = alpha.toString(16);
    var color =  "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2)
    color = applyLightness(color, lightness);
    color = applySat(color, sat * 100) + hexAlpha;
   
    return color
}

function applySat(hex: any, sat: number) {
    var hash = hex.substring(0, 1) === "#";
    hex = (hash ? hex.substring(1) : hex).split("");
    var long = hex.length > 3,
        rgb = [],
        i = 0,
        len = 3;
    rgb.push( hex.shift() + (long ? hex.shift() : "") );
    rgb.push( hex.shift() + (long ? hex.shift() : "") );
    rgb.push( hex.shift() + (long ? hex.shift() : "") );
    for( ; i < len; i++ ) {
        if ( !long ) {
            rgb[i] += rgb[i];
        }
        rgb[i] = Math.round( parseInt(rgb[i], 16)/100*sat).toString(16);
      rgb[i] += rgb[i].length === 1 ? rgb[i] : "";
    }
    return (hash ? "#" : "") + rgb.join("");
}

function applyLightness(color: string, amount: number) {
    var percent = amount*100
    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = Math.round(R * (100 + percent) / 100);
    G = Math.round(G * (100 + percent) / 100);
    B = Math.round(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}
