

function DrawDMX(polylineGeometry,obj) 
{
    var lastCoord;
    var currCoord;  
    var SegmentLength;
   
    var tmpstep;
    var lc0,lc1,lcstep;
    gPointsIndex = 0;
   
    gPositionsArray[0] = [];
    gGridArray[0] = [];
    var lineWaypointPositions = [];
     gMinAltitude =999999999;

   lc0=parseFloat(obj.ClientData("StartLC"));
   lc1=parseFloat(obj.ClientData("EndLC"));
  
    for (var k = 0; k < polylineGeometry.Points.count; k++)   // 得到地面高
    {        
        var Altitude = 0;       
        lineWaypointPositions[k] = SGWorld.Creator.CreatePosition(polylineGeometry.Points.Item(k).X, polylineGeometry.Points.Item(k).Y, Altitude, 3);        
    }
    
    var scale=(lc1-lc0)/polylineGeometry.Length;
    
        lc0=parseFloat(obj.ClientData("StartLC"));
	lastCoord = SGWorld.Creator.CreatePosition(polylineGeometry.Points.Item(0).X, polylineGeometry.Points.Item(0).Y, 0, 3);
	AddPoint(lastCoord,lc0);
	
	 for (var i = 1; i < polylineGeometry.Points.count; i++) 
	 {	        
	        currCoord = SGWorld.Creator.CreatePosition(polylineGeometry.Points.Item(i).X, polylineGeometry.Points.Item(i).Y, 0, 3);
	        	        
	        lastCoord.yaw = lastCoord.AimTo(currCoord).yaw;
	        SegmentLength = lastCoord.DistanceTo(currCoord);	       
	        
	         var count = Math.ceil(SegmentLength / gStep);	        
	         tmpstep = SegmentLength / count;
	         lcstep = SegmentLength*scale/count;
	         for(var k = 1;k <= count;k++)
	         {
	            lc0 += lcstep;
	            lastCoord = lastCoord.MoveToward(currCoord, tmpstep);
	            AddPoint(lastCoord,lc0);
	         }	                 
	         lastCoord=currCoord.copy();
    	}

   
  
    return true;
}

//-------------
// AddPoint
function AddPoint(pos,lc) {
    var position1 = pos.ToAbsolute(0);
    var Altitude = SGWorld.Terrain.GetGroundHeightInfo(position1.X, position1.Y, 2, true).Position.Altitude;
        position1.Altitude = Altitude;
        
	if (Altitude < gMinAltitude) gMinAltitude = Altitude;
    gLinePointsCount[0] = gPointsIndex;
    gPositionsArray[0][gPointsIndex] = position1;
    gGridArray[0][gPointsIndex] = [lc, Altitude];
         
    gPointsIndex += 1;
}


function DrawTrackLine() 
{
     var obj = SGWorld.ProjectTree.GetObject(objectID);        
         var geometry=obj.Geometry;
         
    var lc;
    gPositionsArray[1] = [];
    gGridArray[1] = [];
    var pos;
    
    gLinePointsCount[1] = geometry.Points.count-1;
   var lc0=parseFloat(obj.ClientData("StartLC"));
   var lc1=parseFloat(obj.ClientData("EndLC"));
   var scale = (lc1-lc0)/geometry.Length;
   
    for (var k = 0; k < geometry.Points.count; k++)   // calculate total distance
    {       
        pos = SGWorld.Creator.CreatePosition(geometry.Points.Item(k).X, geometry.Points.Item(k).Y, geometry.Points.Item(k).Z, 3);
        gPositionsArray[1][k] = pos;
         var Altitude = pos.Altitude;      
         if(k>0) {
         	lc0 += pos.DistanceTo(gPositionsArray[1][k-1])*scale;
        };
	
	gGridArray[1][k] = [lc0, Altitude]; 
    }
}

function ReDrawGraph()
{
   var data = [];
  	data.push({ data: gGridArray[0], label: "地面线", lines: { show: true, fill: true,width:1, fillColor: { colors: [{ opacity: 0.7 }, { opacity: 0.1}] } }, color: '#00ff00',threshold: { below: gMinAltitude+50, color: "rgb(200, 20, 30)" }});
	data.push({ data: gGridArray[1], label: "轨面线", lines: { show: true, fill: false }, points: { show: false },color: '#ff0000'});
	if(gPlot!=null) {
     		gPlot.setData(data);
     		gPlot.draw();
     	}
}