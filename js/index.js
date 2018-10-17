/* ----------------------------------------------------------
setting
---------------------------------------------------------- */

var width = 500;
var height = 500;

var presetList = {
  "hokkaidou": {
    label: "北海道胆振東部地震",
    title: "北海道胆振東部地震の地震の推移<tspan>（2016/04/14から3日分）</tspan>",
    // title2 : "1日を4秒で進みます",
    startDate: new Date("2018/09/06"),
    endDate: new Date("2018/10/06"),
    speed: 1000 * 365.25 * (24 / 1),
    useClock: true,
    file: "data/hokkaidou.tsv",
    note: "※気象庁の統計データを利用。M4以上の地震のみプロットします。"
  },
  "kumamoto": {
    label: "熊本地震",
    title: "熊本地震の地震の推移<tspan>（2016/04/14から3日分）</tspan>",
    // title2 : "1日を4秒で進みます",
    startDate: new Date("2016/04/14"),
    endDate: new Date("2016/04/17"),
    speed: 1000 * 365.25 * (24 / 1),
    useClock: true,
    file: "data/kumamoto.tsv",
    note: "※気象庁の統計データを利用。M4以上の地震のみプロットします。"
  },
  "higashi": {
    label: "東日本大震災",
    title: "東日本大震災の地震の推移<tspan>（2011/03/11から3日分）</tspan>",
    // title2 : "1日を4秒で進みます",
    startDate: new Date("2011/03/11"),
    endDate : new Date("2011/03/14"),
    speed: 1000 * 365.25 * (24 / 1),
    useClock: true,
    file: "data/higashi.tsv",
    note: "※気象庁の統計データを利用。M4以上の地震のみプロットします。"
  },
  "hanshin": {
    label: "阪神・淡路大震災",
    title: "兵庫県南部地震の地震の推移<tspan>（1995/01/16から3日分）</tspan>",
    // title2 : "1日を4秒で進みます",
    startDate: new Date("1995/01/17"),
    endDate: new Date("1995/01/20"),
    speed: 1000 * 365.25 * (24 / 1),
    useClock: true,
    file: "data/hanshin.tsv",
    note: "※気象庁の統計データを利用。M4以上の地震のみプロットします。"
  },
  "kantou": {
    label: "関東大震災",
    title: "関東大震災の地震の推移<tspan>（1923/09/01から3日分）</tspan>",
    // title2 : "1日を4秒で進みます",
		startDate : new Date("1923/9/01"),
    endDate: new Date("1923/9/04"),
    speed: 1000 * 365.25 * (24 / 1),
    useClock: true,
    file: "data/kantou.tsv",
    note: "※気象庁の統計データを利用。M4以上の地震のみプロットします。"
  },


  "2020": {
    label: "",
    title: "2000,10年代の地震発生の推移<tspan>（2000-2018年）</tspan>",
    // title2 : "1秒で1年進みます",
    startDate: new Date("2000/01/1 00:00:00"),
    endDate: new Date("2018/07/31 23:59:59"),
    speed: 1000,
    useClock: false,
    file: "data/main.tsv"
  },
  "1980": {
    label: "",
    title: "1980,90年代の地震発生の推移<tspan>（1980-1999年）</tspan>",
    // title2 : "1秒で1年進みます",
    startDate: new Date("1980/01/1 00:00:00"),
    endDate: new Date("1999/12/31 23:59:59"),
    speed: 1000,
    useClock: false,
    file: "data/main.tsv",
    note: "※気象庁の統計データを利用。震度4以上の地震のみプロットします。"
  },
  "1960": {
    label: "",
    title: "1960,70年代の地震発生の推移<tspan>（1960-1969年）</tspan>",
    // title2 : "1秒で1年進みます",
    startDate: new Date("1960/01/1 00:00:00"),
    endDate: new Date("1979/12/31 23:59:59"),
    speed: 1000,
    useClock: false,
    file: "data/main.tsv",
    note: "※気象庁の統計データを利用。震度4以上の地震のみプロットします。"
  },
  "1940": {
    label: "",
    title: "1940,50年代の地震発生の推移<tspan>（1940-1959年）</tspan>",
    // title2 : "1秒で1年進みます",
    startDate: new Date("1940/01/1 00:00:00"),
    endDate: new Date("1959/12/31 23:59:59"),
    speed: 1000,
    useClock: false,
    file: "data/main.tsv",
    note: "※気象庁の統計データを利用。震度4以上の地震のみプロットします。"
  },
  "1920": {
    label: "",
    title: "1920,30年代の地震発生の推移<tspan>（1923-1939年）</tspan>",
    // title2 : "1秒で1年進みます",
    startDate: new Date("1923/01/1 00:00:00"),
    endDate: new Date("1939/12/31 23:59:59"),
    speed: 1000,
    useClock: false,
    file: "data/main.tsv",
    note: "※気象庁の統計データを利用。震度4以上の地震のみプロットします。"
  }
}
var query = _.assignIn({
  preset: "all"
}, _u.getQuery());
var setting = presetList[query["preset"]];

/* ----------------------------------------------------------
prepare
---------------------------------------------------------- */

var svg = d3.select("svg")
var gs = {}

gs.stage = _d3.addG(svg, "", "0,35");

//テキスト
gs.header = _d3.addG(svg, "", "")
_d3.addR(gs.header, "title_bg", "0,0,100%,35")
// _d3.addT(gs.header,"t_title","20,25",title)
_d3.addT(gs.header, "t_title", "20,25", setting.title)
// _d3.addT(gs.header,"t_title2","20,125",setting.title2 )

//ノート
gs.notes = _d3.addG(svg, "", "160,450")
_d3.addT(gs.notes, "t_note", "0,0", "※発生する丸い赤枠(黄色い塗)は、Mの大きさを表しいます")
_d3.addT(gs.notes, "t_note", "0,15", "※地震が引き起こした最大震度を、震源地にプロットします。")
_d3.addT(gs.notes, "t_note", "0,30", setting.note)
// _d3.addT(gs.notes,"t_note","0,15","※気象庁の統計データを利用。M4以上の地震のみプロットします。")


//legend
// gs.legend = _d3.addG(svg,"","80,160");

gs.legend = _d3.addG(svg, "", "30,180");
var legends = [
  ["震度7", "#9c1368", 10],
  ["震度6強", "#8e1623", 8],
  ["震度6弱", "#de3a11", 6],
  ["震度5強", "#e89e1b", 3],
  ["震度5弱", "#f7e926", 2],
  ["震度4", "#f4e899", 1]
];

var legs = gs.legend.selectAll('.legends')
  .data(legends).enter().append('g')
  .attr("class", "legends")
  .attr("transform", (d, i) => "translate(0," + i * 20 + ")");

legs.append('circle')
  .attr("cx", 0).attr("cy", 7)
  .attr("r", d => d[2])
  // .attr("r", d => (d[2]/2)+2 )
  .style("fill", d => d[1])

legs.append('text')
  .attr("class", "legends-text")
  .attr("x", 15).attr("y", 10)
  .text(d => "最大" + d[0])



/* ----------------------------------------------------------
lo_d3.addata
---------------------------------------------------------- */

var mapStages = [
  new Map(svg, _d3.addG(gs.stage, "", "0,0"), setting, "500,470", "0,-30"),
]
d3.tsv(setting.file).then(function(_datas) {

  _datas = treatData(_datas);
  mapStages[0].setData(_datas)
  mapStages[0].stageInit()
  mapStages[0].stageIn()
  return
  // new _u.serial_([
  // 	function () { }
  // 	,0.5, function () {mapStages[3].stageInit()}
  // 	,1.5, function () {
  // 		mapStages[0].stageIn()
  // 		mapStages[3].stageIn()
  // 	}
  // ]).start();
});


function treatData(_datas) {
  var datas = []
  // 77	2011/03/11 19:35:36.5	福島県沖	37°04.2′N	141°20.5′E	49km	Ｍ5.1	４
  // 78	2011/03/11 19:10:39.7	岩手県沖	39°20.0′N	142°09.1′E	44km	Ｍ6.2	４
  // 79	2011/03/11 18:19:52.9	茨城県沖	36°33.7′N	140°57.2′E	15km	Ｍ5.0	４
  // 80	2011/03/11 18:04:13.5	茨城県沖	36°33.0′N	140°57.3′E	17km	Ｍ5.3	４
  // 81	2011/03/11 17:58:07.7	栃木県北部	36°48.8′N	139°27.7′E	3km	Ｍ4.1	４

  for (var i = 0; i < _datas.length; i++) {
    var b = true;
    if (_datas[i].latitude == "不明") b = false;
    if (_datas[i].longitude == "不明") b = false;
    if (_datas[i].mag == "不明") b = false;
    _datas[i].date = _datas[i].date.split(".")[0]
    _datas[i].date = new Date(_datas[i].date);
    if (b) {
      var int = _datas[i].intensity = treatIntensity(_datas[i].intensity)
      _datas[i].mag = _datas[i].mag.split("M").join("")
      _datas[i].mag = _datas[i].mag.split("Ｍ").join("")
      datas.push(_datas[i]);
    }
  }
  return datas;
}