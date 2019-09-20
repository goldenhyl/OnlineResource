//地面线类，地面线最终得到  gGridArray[0]  轨面线，轨面线最终得到  gGridArray[1]

var gMinAltitude=0; //确定Y轴原坐标
var gPositionsArray = [];  //地面线上点的位置
var gStep = 50;  //取点间距
var gGridArray = [];   //每条线上点的网格值(lc,h)  gGridArray[0]存放的就是地面线点[lc,eh]，gGridArray[1]存放的轨面线点，gGridArray[2]存放是坡度线点，全是（里程，高程）点对元素,因此要输出地面线，只需要将gGridArray[0]输出成cvs格式即可。
var firstlc,endlc;

//绘制地面线与地面点坐标,独立的好处是可以只做一次
function DrawDMX(obj)
{
    gPositionsArray = [];
    gGridArray[0] = [];
    gMinAltitude =999999999;
    
    var lastCoord;
    var currCoord;  
    var SegmentLength;
    var polylineGeometry=obj.Geometry;
    var lc0,lc1,lcstep;
     
     lc0=parseFloat(obj.ClientData("LC0"));
     lastCoord = SGWorld.Creator.CreatePosition(polylineGeometry.Points.Item(0).X, polylineGeometry.Points.Item(0).Y, 0, 3);
     AddDMXPoint(lastCoord,lc0);
     
      for (var i = 1; i < polylineGeometry.Points.count; i++) 
	 {	        
	        currCoord = SGWorld.Creator.CreatePosition(polylineGeometry.Points.Item(i).X, polylineGeometry.Points.Item(i).Y, 0, 3);
	        lc1 =parseFloat(obj.ClientData("LC"+i));   //获取每个顶点的里程值
	        
	        lastCoord.yaw = lastCoord.AimTo(currCoord).yaw;
	        SegmentLength = lastCoord.DistanceTo(currCoord);
	        
	         var count = Math.ceil(SegmentLength / gStep);	        
	         tmpstep = SegmentLength / count;
	         lcstep = (lc1-lc0)/count;
	         for(var k = 1;k <count;k++)
	         {
	            lc0 += lcstep;
	            lastCoord = lastCoord.MoveToward(currCoord, tmpstep);
	            AddDMXPoint(lastCoord,lc0);
	         }
	          AddDMXPoint(currCoord,lc1);
	         lastCoord=currCoord.copy();
	         lc0=lc1;
    	}    
	
   
   
}

function DrawTrackLine(obj)
{
	var lc;
	gGridArray[1] = [];
	var polylineGeometry=obj.Geometry;
	for (var i = 0; i < polylineGeometry.Points.count; i++) 
	 {
	 	lc =parseFloat(obj.ClientData("LC"+i)); 
	 	if(polylineGeometry.Points.Item(i).Z>0) gGridArray[1].push([lc, polylineGeometry.Points.Item(i).Z]);    
	}
}


//通过基线对象所关联的每个顶点的里程属性来初始化gGridArray[0],好处是每个顶点的里程与工程上的里程一致。
function DMX_DrawBySetLC(obj) 
{
    var lastCoord;
    var currCoord;  
    var SegmentLength;
   
    var tmpstep;
    var lc0,lc1,lcstep;
    var polylineGeometry=obj.Geometry;
   
    gPositionsArray = [];
    gGridArray[0] = [];
    gGridArray[1] = [];   
     gMinAltitude =999999999;

    
        lc0=parseFloat(obj.ClientData("LC0"));
	lastCoord = SGWorld.Creator.CreatePosition(polylineGeometry.Points.Item(0).X, polylineGeometry.Points.Item(0).Y, 0, 3);
	AddDMXPoint(lastCoord,lc0,polylineGeometry.Points.Item(0).Z);
	
	 for (var i = 1; i < polylineGeometry.Points.count; i++) 
	 {	        
	        currCoord = SGWorld.Creator.CreatePosition(polylineGeometry.Points.Item(i).X, polylineGeometry.Points.Item(i).Y, 0, 3);
	        lc1=parseFloat(obj.ClientData("LC"+i));   //获取每个顶点的里程值
	        
	        lastCoord.yaw = lastCoord.AimTo(currCoord).yaw;
	        SegmentLength = lastCoord.DistanceTo(currCoord);
	        
	         var count = Math.ceil(SegmentLength / gStep);	        
	         tmpstep = SegmentLength / count;
	         lcstep = (lc1-lc0)/count;
	         for(var k = 1;k <count;k++)
	         {
	            lc0 += lcstep;
	            lastCoord = lastCoord.MoveToward(currCoord, tmpstep);
	            AddDMXPoint(lastCoord,lc0,-1);
	         }
	          AddDMXPoint(currCoord,lc1,polylineGeometry.Points.Item(i).Z);
	         lastCoord=currCoord.copy();
	         lc0=lc1;
    	}
    	endlc=lc1;
    	
    return true;
}

//通过基线对象顶点距离自动计算里程来初始化gGridArray[0],好处对所有线都适用。
function DMX_DrawByDist(polylineGeometry,obj) 
{
    var lastCoord;
    var currCoord;  
    var SegmentLength;      
    var lc0,lc1,lcstep;   
   
    gPositionsArray = [];
    gGridArray[0] = [];
    gGridArray[1] = [];   
    gMinAltitude =999999999;

  
        lastCoord = SGWorld.Creator.CreatePosition(polylineGeometry.Points.Item(0).X, polylineGeometry.Points.Item(0).Y, 0, 3);            
        lc0=firstlc;
	
	AddDMXPoint(lastCoord,lc0,polylineGeometry.Points.Item(0).Z);
	
	 for (var i = 1; i < polylineGeometry.Points.count; i++) 
	 {	        
	        currCoord = SGWorld.Creator.CreatePosition(polylineGeometry.Points.Item(i).X, polylineGeometry.Points.Item(i).Y, 0, 3);
	        	        
	        lastCoord.yaw = lastCoord.AimTo(currCoord).yaw;
	        SegmentLength = lastCoord.DistanceTo(currCoord);  //may calc with Z value
	        
	        lc1=lc0+SegmentLength;	   
	         var count = Math.ceil(SegmentLength / gStep);	
	         lcstep = (lc1-lc0)/count;	         
	         for(var k = 1;k < count;k++)
	         {
	            lc0 += lcstep;
	            lastCoord = lastCoord.MoveToward(currCoord, lcstep);
	            AddDMXPoint(lastCoord,lc0,-1);
	         }	                 
	              
	         AddDMXPoint(currCoord,lc1,polylineGeometry.Points.Item(i).Z);
	         lastCoord=currCoord.copy();
	         lc0=lc1;
    	}

   
  
    return true;
}


function AddDMXPoint(pos,lc) {
    var position1 = pos.ToAbsolute(0);  
    var Altitude = SGWorld.Terrain.GetGroundHeightInfo(position1.X, position1.Y, 2, true).Position.Altitude;
        position1.Altitude = Altitude;
    
    if (Altitude < gMinAltitude) gMinAltitude = Altitude;
    
    gPositionsArray.push(position1);
    gGridArray[0].push([lc, Altitude]);   
}


//-------------
// AddDMXPoint  0
function AddDMXPoint(pos,lc,th) {
    var position1 = pos.ToAbsolute(0);  
    var Altitude = SGWorld.Terrain.GetGroundHeightInfo(position1.X, position1.Y, 2, true).Position.Altitude;
        position1.Altitude = Altitude;
    
    if (Altitude < gMinAltitude) gMinAltitude = Altitude;
    
    gPositionsArray.push(position1);
    gGridArray[0].push([lc, Altitude]); 
   if(th>0) gGridArray[1].push([lc, th]);     
}


function DMX_GetGeolayer()
{
    var len=gGridArray[0].length;
	 var th,lc;
	  
	  
	 gGridArray[3]=[];	 
	 for(var i=0;i<len;i++)
	    {
	        lc=gGridArray[0][i][0];
	        th=gGridArray[0][i][1]-10-3*Math.random();	        
	        gGridArray[3][i]=[lc,th];
	    }	    
	
	
	gGridArray[4]=[];
	 for(var i=0;i<len;i++)
	    {
	         lc=gGridArray[0][i][0];
	        th=gGridArray[3][i][1]-20-5*Math.random();	        
	        gGridArray[4][i]=[lc,th];
	    }
	    	
	 gGridArray[5]=[];
	 for(var i=0;i<len;i++)
	    {
	        lc=gGridArray[0][i][0];
	        th=gGridArray[4][i][1]-40-8*Math.random();	        
	        gGridArray[5][i]=[lc,th];
	    }	    
	 
	 gGridArray[6]=[];
	 for(var i=0;i<len;i++)
	    {
	        lc=gGridArray[0][i][0];
	        th=gGridArray[5][i][1]-80-15*Math.random();	        
	        gGridArray[6][i]=[lc,th];
	    }	    
	   
}

//获取任何里程的地面高程
function DMX_getlcElev(lc)
{
    var len=gGridArray[0].length;
	
   for(var i=1;i<len;i++)
   {
      if(lc>=gGridArray[0][i-1][0] && lc<=gGridArray[0][i][0])
      {
         return gGridArray[0][i-1][1]+(gGridArray[0][i][1]-gGridArray[0][i-1][1])*(lc-gGridArray[0][i-1][0])/(gGridArray[0][i][0]-gGridArray[0][i-1][0]);
      }
   }
}

//获取任何里程的轨面高程
function DMX_getTrackH(lc)
{
    var len=gGridArray[1].length;
	
   for(var i=1;i<len;i++)
   {
      if(lc>=gGridArray[1][i-1][0] && lc<=gGridArray[1][i][0])
      {
         return gGridArray[1][i-1][1]+(gGridArray[1][i][1]-gGridArray[1][i-1][1])*(lc-gGridArray[1][i-1][0])/(gGridArray[1][i][0]-gGridArray[1][i-1][0]);
      }
   }
}

//跳转到任意里程
function DMX_JumpToLC(lc)
{      	
	//alert(lc);
	if(!isFollow) return; 
	if (lc<firstlc) return;
	if (lc>endlc) return;
	
	var len=gGridArray[0].length;	
	var x,y,h;
	var pos;
	
   for(var i=1;i<=len;i++)
   {
      if(lc>=gGridArray[0][i-1][0] && lc<=gGridArray[0][i][0])
      {
         h = gGridArray[0][i-1][1]+(gGridArray[0][i][1]-gGridArray[0][i-1][1])*(lc-gGridArray[0][i-1][0])/(gGridArray[0][i][0]-gGridArray[0][i-1][0]);         
         x = gPositionsArray[i-1].X+(gPositionsArray[i].X-gPositionsArray[i-1].X)*(lc-gGridArray[0][i-1][0])/(gGridArray[0][i][0]-gGridArray[0][i-1][0]);
         y = gPositionsArray[i-1].Y+(gPositionsArray[i].Y-gPositionsArray[i-1].Y)*(lc-gGridArray[0][i-1][0])/(gGridArray[0][i][0]-gGridArray[0][i-1][0]);
         pos = SGWorld.Creator.CreatePosition(x, y, h+100, 3);
         pos.pitch=-90;
         SGWorld.Navigate.JumpTo(pos);
         return;
      }
   }   
}

//获取任单里程的坐标
function GetPosByLc(lc)
{
	if (lc<firstlc) return null;
	if (lc>endlc) return null;
	
	var len=gGridArray[0].length;	
	var x,y,h;
	var pos;
	
   for(var i=1;i<=len;i++)
   {
      if(lc>=gGridArray[0][i-1][0] && lc<=gGridArray[0][i][0])
      {
         h = gGridArray[0][i-1][1]+(gGridArray[0][i][1]-gGridArray[0][i-1][1])*(lc-gGridArray[0][i-1][0])/(gGridArray[0][i][0]-gGridArray[0][i-1][0]);         
         x = gPositionsArray[i-1].X+(gPositionsArray[i].X-gPositionsArray[i-1].X)*(lc-gGridArray[0][i-1][0])/(gGridArray[0][i][0]-gGridArray[0][i-1][0]);
         y = gPositionsArray[i-1].Y+(gPositionsArray[i].Y-gPositionsArray[i-1].Y)*(lc-gGridArray[0][i-1][0])/(gGridArray[0][i][0]-gGridArray[0][i-1][0]);
         pos = SGWorld.Creator.CreatePosition(x, y, h, 3);        
         return pos;
      }
   }   
   return null;
}

//-------------
// 跳转至任意给定地面线点索引的点位置
function DMX_JumpToPoint(Point)
{      
    var nextPoint;
    var nextSign;
    if (Point >= gPositionsArray.length) {
        nextPoint = gPositionsArray[Point - 1].Copy();
        nextSign = 1;
    }
    else {
        nextPoint = gPositionsArray[Point + 1].Copy();
        nextSign = -1;
    }

    var jumpPos = gPositionsArray[Point].Copy();
    var tmpPos = gPositionsArray[Point].Copy();
    jumpPos.Distance = 250;
    jumpPos.Pitch = -60;
    jumpPos.Yaw = tmpPos.AimTo(nextPoint).Yaw + 90*nextSign;

    SGWorld.Navigate.JumpTo(jumpPos);
}