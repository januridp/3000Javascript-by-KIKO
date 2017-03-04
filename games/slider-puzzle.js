// Dynapi code by Dan Steinman
// http://www.dansteinman.com/dynapi/

// Name = new Puzzle(Xpos, Ypos, 'Name', width, height, 'Color', 'GifPath');
// Name must be the same in both places GifPath may be relative or absolute

function Puzzle(q,v,n,W,H,c,g){
this.mixem=null
this.x=new Array()
this.y=new Array()
this.n=new Array()
this.name=n
this.f=false
this.ma=false
this.g=0
this.w=W/3
this.h=H/3
s=css(n+"kDiv",q,v,W+20,H+60,c)
s+=css(n+"mDiv",10,50,W,H,c)
d='<DIV ID="'+n+'kDiv"><center><font color=blue size=5>'
d+='<a href="javascript:'+n+'.scramble()">Scramble</a>&nbsp;or&nbsp;'
d+='<a href="javascript:'+n+'.solve()">Solve</a></font></center>\n'
d+='<DIV ID="'+n+'mDiv">\n'
for(i=0;i<8;i++){
m=n+i
cn1=i
cn2=0
if(cn1>5)cn1-=6,cn2=2
if(cn1>2)cn1-=3,cn2=1
x=this.w*cn1
y=this.h*cn2
s+=css(m+"aDiv",x,y,this.w,this.h,c)
s+=css(m+"bDiv",0-x,0-y,W,H)
d+='<DIV ID="'+m+'aDiv" onclick="javascript:'+n+'.mov('+i+')">'
d+='<DIV ID="'+m+'bDiv"><img src='+g+' height='+H+' width='+W+'>'
d+='</div></div>\n'
this.x[i]=cn1
this.y[i]=cn2
this.n[i]=m + "a"
}
d+='</div></div>\n'
this.x[8]=2
this.y[8]=2
this.s=s
this.d=d
this.getCss  =PuzzleGetCss
this.getDiv  =PuzzleGetDiv
this.move    =PuzzleMove
this.mov     =PuzzleMov  
this.scramble=PuzzleSc  
this.solve   =PuzzleSolve
this.mixemup =PuzzleSC 
this.stop    =PuzzleStop
}
function PuzzleMov(i){if(this.ma)return
eval(this.name+'.move(i)')
}
function PuzzleStop(){
eval('clearInterval('+this.mixem+')')
this.ma=false
}
function PuzzleSc(){if(this.ma)return
this.ma=true
eval('setTimeout("'+this.name+'.stop()",15500)')
eval('this.mixem=setInterval("'+this.name+'.mixemup()",300)')
} 
function PuzzleSC(){
this.f=false
while(!this.f){
eval(this.name+'.move('+this.g+++')')
if(this.g==8)this.g=-1}
}
function PuzzleSolve(){if(this.ma)return
for(i=0;i<3;i++){for(j=0;j<3;j++){
if(i*3+j<8)eval(this.n[i*3+j]+'.slideTo(this.w * j,this.h * i)')
this.y[i*3+j]=i
this.x[i*3+j]=j}}
}     
function PuzzleMove(n){
x = this.x[n]
y = this.y[n]
w = this.x[8]
z = this.y[8]
if(((x==w)|(y==z))&(((x-1)==w)|((x+1)==w)|((y-1)==z)|((y+1)==z))){
this.f=true
eval(this.n[n]+'.slideTo(this.w*w,this.h*z)')
this.x[n] = w
this.y[n] = z
this.x[8] = x
this.y[8] = y}
}
function PuzzleGetCss(){return this.s}
function PuzzleGetDiv(){return this.d}
function init(){DynLayerInit()}
// Dynamic Layer Object
// sophisticated layer/element targeting and animation object which provides the core functionality needed in most DHTML applications
// 19990604

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function DynLayer(id,nestref,frame) {
if (!is.ns5 && !DynLayer.set && !frame) DynLayerInit()
this.frame = frame || self
if (is.ns) {
if (is.ns4) {
if (!frame) {
if (!nestref) var nestref = DynLayer.nestRefArray[id]
if (!DynLayerTest(id,nestref)) return
this.css = (nestref)? eval("document."+nestref+".document."+id) : document.layers[id]
}
else this.css = (nestref)? eval("frame.document."+nestref+".document."+id) : frame.document.layers[id]
this.elm = this.event = this.css
this.doc = this.css.document
}
else if (is.ns5) {
this.elm = document.getElementById(id)
this.css = this.elm.style
this.doc = document
}
this.x = this.css.left
this.y = this.css.top
this.w = this.css.clip.width
this.h = this.css.clip.height
}
else if (is.ie) {
this.elm = this.event = this.frame.document.all[id]
this.css = this.frame.document.all[id].style
this.doc = document
this.x = this.elm.offsetLeft
this.y = this.elm.offsetTop
this.w = (is.ie4)? this.css.pixelWidth : this.elm.offsetWidth
this.h = (is.ie4)? this.css.pixelHeight : this.elm.offsetHeight
}
this.id = id
this.nestref = nestref
this.obj = id + "DynLayer"
eval(this.obj + "=this")
}
function DynLayerMoveTo(x,y) {
if (x!=null) {
this.x = x
if (is.ns) this.css.left = this.x
else this.css.pixelLeft = this.x
}
if (y!=null) {
this.y = y
if (is.ns) this.css.top = this.y
else this.css.pixelTop = this.y
}
}
function DynLayerMoveBy(x,y) {
this.moveTo(this.x+x,this.y+y)
}
function DynLayerShow() {
this.css.visibility = (is.ns4)? "show" : "visible"
}
function DynLayerHide() {
this.css.visibility = (is.ns4)? "hide" : "hidden"
}
DynLayer.prototype.moveTo = DynLayerMoveTo
DynLayer.prototype.moveBy = DynLayerMoveBy
DynLayer.prototype.show = DynLayerShow
DynLayer.prototype.hide = DynLayerHide
DynLayerTest = new Function('return true')

// DynLayerInit Function
function DynLayerInit(nestref) {
if (!DynLayer.set) DynLayer.set = true
if (is.ns) {
if (nestref) ref = eval('document.'+nestref+'.document')
else {nestref = ''; ref = document;}
for (var i=0; i<ref.layers.length; i++) {
var divname = ref.layers[i].name
DynLayer.nestRefArray[divname] = nestref
var index = divname.indexOf("Div")
if (index > 0) {
eval(divname.substr(0,index)+' = new DynLayer("'+divname+'","'+nestref+'")')
}
if (ref.layers[i].document.layers.length > 0) {
DynLayer.refArray[DynLayer.refArray.length] = (nestref=='')? ref.layers[i].name : nestref+'.document.'+ref.layers[i].name
}
}
if (DynLayer.refArray.i < DynLayer.refArray.length) {
DynLayerInit(DynLayer.refArray[DynLayer.refArray.i++])
}
}
else if (is.ie) {
for (var i=0; i<document.all.tags("DIV").length; i++) {
var divname = document.all.tags("DIV")[i].id
var index = divname.indexOf("Div")
if (index > 0) {
eval(divname.substr(0,index)+' = new DynLayer("'+divname+'")')
}
}
}
return true
}
DynLayer.nestRefArray = new Array()
DynLayer.refArray = new Array()
DynLayer.refArray.i = 0
DynLayer.set = false

// Slide Methods
function DynLayerSlideTo(endx,endy,inc,speed,fn) {
if (endx==null) endx = this.x
if (endy==null) endy = this.y
var distx = endx-this.x
var disty = endy-this.y
this.slideStart(endx,endy,distx,disty,inc,speed,fn)
}
function DynLayerSlideBy(distx,disty,inc,speed,fn) {
var endx = this.x + distx
var endy = this.y + disty
this.slideStart(endx,endy,distx,disty,inc,speed,fn)
}
function DynLayerSlideStart(endx,endy,distx,disty,inc,speed,fn) {
if (this.slideActive) return
if (!inc) inc = 20
if (!speed) speed = 20
var num = Math.sqrt(Math.pow(distx,2) + Math.pow(disty,2))/inc
if (num==0) return
var dx = distx/num
var dy = disty/num
if (!fn) fn = null
this.slideActive = true
this.slide(dx,dy,endx,endy,num,1,speed,fn)
}
function DynLayerSlide(dx,dy,endx,endy,num,i,speed,fn) {
if (!this.slideActive) return
if (i++ < num) {
this.moveBy(dx,dy)
this.onSlide()
if (this.slideActive) setTimeout(this.obj+".slide("+dx+","+dy+","+endx+","+endy+","+num+","+i+","+speed+",\""+fn+"\")",speed)
else this.onSlideEnd()
}
else {
this.slideActive = false
this.moveTo(endx,endy)
this.onSlide()
this.onSlideEnd()
eval(fn)
}
}
function DynLayerSlideInit() {}
DynLayer.prototype.slideInit = DynLayerSlideInit
DynLayer.prototype.slideTo = DynLayerSlideTo
DynLayer.prototype.slideBy = DynLayerSlideBy
DynLayer.prototype.slideStart = DynLayerSlideStart
DynLayer.prototype.slide = DynLayerSlide
DynLayer.prototype.onSlide = new Function()
DynLayer.prototype.onSlideEnd = new Function()

// Clip Methods
function DynLayerClipInit(clipTop,clipRight,clipBottom,clipLeft) {
if (is.ie) {
if (arguments.length==4) this.clipTo(clipTop,clipRight,clipBottom,clipLeft)
else if (is.ie4) this.clipTo(0,this.css.pixelWidth,this.css.pixelHeight,0)
}
}
function DynLayerClipTo(t,r,b,l) {
if (t==null) t = this.clipValues('t')
if (r==null) r = this.clipValues('r')
if (b==null) b = this.clipValues('b')
if (l==null) l = this.clipValues('l')
if (is.ns) {
this.css.clip.top = t
this.css.clip.right = r
this.css.clip.bottom = b
this.css.clip.left = l
}
else if (is.ie) this.css.clip = "rect("+t+"px "+r+"px "+b+"px "+l+"px)"
}
function DynLayerClipBy(t,r,b,l) {
this.clipTo(this.clipValues('t')+t,this.clipValues('r')+r,this.clipValues('b')+b,this.clipValues('l')+l)
}
function DynLayerClipValues(which) {
if (is.ie) var clipv = this.css.clip.split("rect(")[1].split(")")[0].split("px")
if (which=="t") return (is.ns)? this.css.clip.top : Number(clipv[0])
if (which=="r") return (is.ns)? this.css.clip.right : Number(clipv[1])
if (which=="b") return (is.ns)? this.css.clip.bottom : Number(clipv[2])
if (which=="l") return (is.ns)? this.css.clip.left : Number(clipv[3])
}
DynLayer.prototype.clipInit = DynLayerClipInit
DynLayer.prototype.clipTo = DynLayerClipTo
DynLayer.prototype.clipBy = DynLayerClipBy
DynLayer.prototype.clipValues = DynLayerClipValues

// Write Method
function DynLayerWrite(html) {
if (is.ns) {
this.doc.open()
this.doc.write(html)
this.doc.close()
}
else if (is.ie) {
this.event.innerHTML = html
}
}
DynLayer.prototype.write = DynLayerWrite

// BrowserCheck Object
function BrowserCheck() {
var b = navigator.appName
if (b=="Netscape") this.b = "ns"
else if (b=="Microsoft Internet Explorer") this.b = "ie"
else this.b = b
this.version = navigator.appVersion
this.v = parseInt(this.version)
this.ns = (this.b=="ns" && this.v>=4)
this.ns4 = (this.b=="ns" && this.v==4)
this.ns5 = (this.b=="ns" && this.v==5)
this.ie = (this.b=="ie" && this.v>=4)
this.ie4 = (this.version.indexOf('MSIE 4')>0)
this.ie5 = (this.version.indexOf('MSIE 5')>0)
this.min = (this.ns||this.ie)
}
is = new BrowserCheck()

// CSS Function
function css(id,left,top,width,height,color,vis,z,other) {
if (id=="START") return '<STYLE TYPE="text/css">\n'
else if (id=="END") return '</STYLE>'
var str = (left!=null && top!=null)? '#'+id+' {position:absolute; left:'+left+'px; top:'+top+'px;' : '#'+id+' {position:relative;'
if (arguments.length>=4 && width!=null) str += ' width:'+width+'px;'
if (arguments.length>=5 && height!=null) {
str += ' height:'+height+'px;'
if (arguments.length<9 || other.indexOf('clip')==-1) str += ' clip:rect(0px '+width+'px '+height+'px 0px);'
}
if (arguments.length>=6 && color!=null) str += (is.ns)? ' layer-background-color:'+color+';' : ' background-color:'+color+';'
if (arguments.length>=7 && vis!=null) str += ' visibility:'+vis+';'
if (arguments.length>=8 && z!=null) str += ' z-index:'+z+';'
if (arguments.length==9 && other!=null) str += ' '+other
str += '}\n'
return str
}
function writeCSS(str,showAlert) {
str = css('START')+str+css('END')
document.write(str)
if (showAlert) alert(str)
}
